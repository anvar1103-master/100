// Shared game state.
export const G = {
  state:'load',            // load | menu | countdown | play | end
  time:0,                  // game clock (s)
  fighters:[], me:null,
  shots:[], lobs:[], beams:[], puddles:[], pickups:[],
  match:null,
  shake:0,
  paused:false,
  hooks:{},                // event listeners: kill, damage, attack, super, spawn, pickup
};
export function emit(ev, ...a){ const h = G.hooks[ev]; if(h) for(const fn of h) fn(...a); }
export function on(ev, fn){ (G.hooks[ev] || (G.hooks[ev] = [])).push(fn); }
export const isEnemy = (a, b) => a !== b && a.team !== b.team;
