// Shared game state and a tiny event bus. The simulation writes, rendering and the HUD read.
export const G = {
  state:'load',            // load | menu | play | end
  time:0,                  // match clock (s)
  fighters:[], me:null,
  match:null,
  paused:false,
  settings:null,
  hooks:{},
};
export function emit(ev, ...a){ const h = G.hooks[ev]; if(h) for(const fn of h) fn(...a); }
export function on(ev, fn){ (G.hooks[ev] || (G.hooks[ev] = [])).push(fn); }
