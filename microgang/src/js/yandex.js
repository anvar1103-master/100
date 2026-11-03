// Yandex Games SDK. Active only when the page has loaded /sdk.js (the Yandex build, dist/yandex); everywhere else
// every call does nothing. Language from the player's Yandex account, «loaded» and «gameplay» signals, a fullscreen
// ad between matches (with the sound off and the mouse released while it shows).
import { G } from './state.js';
import { silence, AU } from './audio.js';
import { langOf, L } from './i18n.js';

export const YA = { sdk:null, ready:false, adOn:false, playing:false };
export const onYandex = () => !!window.YaGames;
export async function yaInit(){
  if(!onYandex()) return;
  try{
    YA.sdk = await window.YaGames.init();
    // the player's Yandex language, unless they picked one in the settings (that reloads with ?lang=)
    try{ const l = YA.sdk.environment.i18n.lang; if(l && !new URLSearchParams(location.search).get('lang')) L.lang = langOf(l); }catch(e){}
  }catch(e){}
}
// the game can be played: Yandex hides its loader
export function yaLoaded(){ if(YA.sdk && !YA.ready){ YA.ready = true; try{ YA.sdk.features.LoadingAPI.ready(); }catch(e){} } }
// real gameplay only (menus, pause, the end screen and ads do not count)
export function yaTick(){
  if(!YA.sdk) return;
  const on = !YA.adOn && !G.paused && !document.hidden && G.state === 'play';
  if(on === YA.playing) return;
  YA.playing = on;
  try{ const GA = YA.sdk.features.GameplayAPI; on ? GA.start() : GA.stop(); }catch(e){}
}
function adStart(){ YA.adOn = true; silence(true); if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){} }
function adEnd(){ YA.adOn = false; if(!document.hidden) silence(false); }
// a fullscreen ad before a new match (Yandex itself keeps them far enough apart)
export function yaInterstitial(then){
  if(!YA.sdk){ then(); return; }
  let fin = false; const end = () => { if(fin) return; fin = true; adEnd(); then(); };
  try{ YA.sdk.adv.showFullscreenAdv({ callbacks:{ onOpen:adStart, onClose:end, onError:end, onOffline:end } }); }catch(e){ end(); }
}
addEventListener('visibilitychange', () => { if(!YA.adOn && AU.ctx) silence(document.hidden); });
