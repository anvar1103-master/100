// Unit tests for the pure modules (physics, weapons). Run: node tools/unit.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { W, resetWorld, addCol, moveChar, ray, freeAt, losClear, boxRot } from '../src/js/phys.js';

const flat = () => resetWorld({ groundH:() => 0, grassAt:() => 0, waterAt:() => -1e9, waterLevel:undefined, half:140, cell:8, bound:95 });
const ch = (x, y, z) => ({ x, y, z, vx:0, vy:0, vz:0, r:0.38, h:1.7, ground:false });
function walk(c, vx, vz, t, grav = true){ for(let i = 0; i < t * 60; i++){ c.vx = vx; c.vz = vz; if(grav) c.vy -= 22 / 60; moveChar(c, 1 / 60); } return c; }

test('stands on flat terrain', () => {
  flat(); const c = walk(ch(0, 2, 0), 0, 0, 1.5);
  assert.ok(Math.abs(c.y) < 1e-6 && c.ground);
});
test('follows sloped terrain', () => {
  resetWorld({ groundH:(x) => x * 0.2, grassAt:() => 0, half:140, cell:8, bound:95 });
  const c = walk(ch(0, 0, 0), 4, 0, 1);
  assert.ok(Math.abs(c.y - c.x * 0.2) < 0.05 && c.ground, `y ${c.y} x ${c.x}`);
});
test('stands on a cylinder top (mushroom cap)', () => {
  flat(); addCol({ t:'cyl', x:0, z:0, r:3, y0:0, y1:4, mat:'shroom' });
  const c = walk(ch(0.5, 6, 0), 0, 0, 1.5);
  assert.ok(Math.abs(c.y - 4) < 1e-6 && c.ground);
});
test('pushed out of a stem', () => {
  flat(); addCol({ t:'cyl', x:0, z:0, r:1, y0:0, y1:10 });
  const c = walk(ch(-4, 0, 0), 4, 0, 2);
  assert.ok(c.x <= -1.37 && c.x > -1.5, `x ${c.x}`);
});
test('steps up 0.45, blocked by 0.9', () => {
  flat(); addCol({ t:'cyl', x:3, z:0, r:1, y0:0, y1:0.45 });
  const a = walk(ch(0, 0, 0), 3, 0, 1.3);
  assert.ok(a.x > 2.5 && Math.abs(a.y - 0.45) < 0.01, `x ${a.x} y ${a.y}`);
  flat(); addCol({ t:'cyl', x:3, z:0, r:1, y0:0, y1:0.9 });
  const b = walk(ch(0, 0, 0), 3, 0, 1.3);
  assert.ok(b.x < 1.7 && b.y < 0.1, `x ${b.x} y ${b.y}`);
});
test('walks over a lying twig (capsule) and up a leaning one', () => {
  flat(); addCol({ t:'cap', ax:2, ay:0.2, az:-5, bx:2, by:0.2, bz:5, r:0.2 });
  const a = walk(ch(0, 0, 0), 3, 0, 1.6);
  assert.ok(a.x > 3, `x ${a.x}`);
  flat(); addCol({ t:'cap', ax:0, ay:-0.5, az:1.5, bx:0, by:4, bz:12, r:0.6 });
  const b = walk(ch(0, 0, 0), 0, 3, 3);
  assert.ok(b.y > 1.5, `y ${b.y} z ${b.z}`);
});
test('stands on a sphere and on a tilted box (leaf ramp)', () => {
  flat(); addCol({ t:'sph', x:0, y:0, z:0, r:2 });
  const a = walk(ch(0, 4, 0), 0, 0, 1.5);
  assert.ok(a.y > 1.4 && a.ground, `y ${a.y}`);
  flat(); addCol({ t:'box', x:0, y:1, z:5, hx:3, hy:0.1, hz:4, m:boxRot(0, -0.25) });
  const b = walk(ch(0, 0, 0), 0, 3, 3);
  assert.ok(b.y > 0.8, `y ${b.y}`);
});
test('the meadow edge holds you in', () => {
  flat(); const c = walk(ch(90, 0, 0), 10, 0, 2);
  assert.ok(c.x <= 95);
});
test('ray hits terrain, sphere, capsule, box, cylinder with normals and materials', () => {
  flat();
  let h = ray(0, 5, 0, 0, -1, 0, 50); assert.ok(h && Math.abs(h.t - 5) < 0.02 && h.ny > 0.99 && h.mat === 'dirt');
  addCol({ t:'sph', x:10, y:1, z:0, r:1, mat:'stone' });
  h = ray(0, 1, 0, 1, 0, 0, 50); assert.ok(h && Math.abs(h.t - 9) < 1e-6 && h.mat === 'stone' && h.nx < -0.99);
  addCol({ t:'cap', ax:0, ay:1, az:-10, bx:0, by:1, bz:-20, r:0.5, mat:'wood' });
  h = ray(0, 1, 0, 0, 0, -1, 50); assert.ok(h && Math.abs(h.t - 9.5) < 1e-6 && h.mat === 'wood');
  addCol({ t:'box', x:-10, y:1, z:0, hx:1, hy:1, hz:1, m:boxRot(0), mat:'leaf' });
  h = ray(0, 1, 0, -1, 0, 0, 50); assert.ok(h && Math.abs(h.t - 9) < 1e-6 && h.mat === 'leaf' && h.nx > 0.99);
  addCol({ t:'cyl', x:0, z:10, r:2, y0:0, y1:6, mat:'shroom' });
  h = ray(0, 1, 0, 0, 0, 1, 50); assert.ok(h && Math.abs(h.t - 8) < 1e-6 && h.mat === 'shroom');
  h = ray(0, 10, 10, 0, -1, 0, 50); assert.ok(h && Math.abs(h.t - 4) < 1e-6 && h.ny > 0.99);
});
test('long rays across many grid cells find far things, nothing beyond tmax', () => {
  flat(); addCol({ t:'sph', x:120, y:2, z:-80, r:1.5, mat:'stone' });
  const d = [120, 0, -80], L = Math.hypot(...d);
  let h = ray(0, 2, 0, d[0] / L, 0, d[2] / L, 300); assert.ok(h && h.mat === 'stone' && Math.abs(h.t - (L - 1.5)) < 0.01);
  h = ray(0, 2, 0, d[0] / L, 0, d[2] / L, 100); assert.equal(h, null);
});
test('line of sight: blocked by solids and by dense tall grass, clear through a little of it', () => {
  flat(); addCol({ t:'cyl', x:5, z:0, r:1, y0:0, y1:10 });
  assert.equal(losClear(0, 1.5, 0, 10, 1.5, 0), false);
  assert.equal(losClear(0, 1.5, 3, 10, 1.5, 3), true);
  resetWorld({ groundH:() => 0, grassAt:(x, z, o) => { o.h = 8; return x > 3 && x < 8 ? 1 : 0; }, half:140, cell:8, bound:95 });
  assert.equal(losClear(0, 1.5, 0, 12, 1.5, 0), false);
  assert.equal(losClear(0, 1.5, 0, 4.5, 1.5, 0), true);
  assert.equal(losClear(0, 12, 0, 12, 12, 0), true);   // above the grass tops
});
test('freeAt finds blocked and free spots', () => {
  flat(); addCol({ t:'cyl', x:0, z:0, r:2, y0:0, y1:5 });
  assert.equal(freeAt(0.5, 0, 0, 0.38, 1.7), false);
  assert.equal(freeAt(4, 0, 0, 0.38, 1.7), true);
  assert.equal(freeAt(0.5, 5, 0, 0.38, 1.7), true);
});
