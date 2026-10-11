// Yandex Games SDK. Only active when the page has loaded /sdk.js (the Yandex build); everywhere else it is a no-op.
import { G } from './state.js';
import { silence, AU } from './audio.js';
import { applyLang, langOf, L } from './i18n.js';

export const YA = { sdk:null, ready:false, adOn:false, playing:false };
export const onYandex = () => !!window.YaGames;
export async function yaInit(){
  if(!onYandex()) return;
  try{
    YA.sdk = await window.YaGames.init();
    try{ const l = YA.sdk.environment.i18n.lang; if(l) applyLang(langOf(l)); }catch(e){}
  }catch(e){}
}
// the game is ready to play: Yandex hides its own loader
export function yaLoaded(){ if(YA.sdk && !YA.ready){ YA.ready = true; try{ YA.sdk.features.LoadingAPI.ready(); }catch(e){} } }
// report real gameplay (menus, pause, end screen and ads don't count)
export function yaTick(){
  if(!YA.sdk) return;
  const on = !YA.adOn && !G.paused && !document.hidden && (G.state === 'play' || G.state === 'countdown');
  if(on === YA.playing) return;
  YA.playing = on;
  try{ const GA = YA.sdk.features.GameplayAPI; on ? GA.start() : GA.stop(); }catch(e){}
}
function adStart(){ YA.adOn = true; AU.ad = true; silence(true); if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){} }
function adEnd(){ YA.adOn = false; AU.ad = false; if(!document.hidden) silence(false); }
// fullscreen ad between matches (Yandex itself keeps them apart)
export function yaInterstitial(then){
  if(!YA.sdk){ if(then) then(); return; }
  let fin = false; const end = () => { if(fin) return; fin = true; adEnd(); if(then) then(); };
  try{ YA.sdk.adv.showFullscreenAdv({ callbacks:{ onOpen:adStart, onClose:end, onError:end, onOffline:end } }); }catch(e){ end(); }
}
// rewarded video: reward() runs only if the player watched it to the end
export function yaRewarded(reward){
  if(!YA.sdk) return false;
  let got = false;
  try{ YA.sdk.adv.showRewardedVideo({ callbacks:{ onOpen:adStart, onRewarded:() => { got = true; }, onClose:() => { adEnd(); if(got) reward(); }, onError:() => adEnd() } }); }catch(e){ adEnd(); }
  return true;
}
addEventListener('visibilitychange', () => { if(!YA.adOn) silence(document.hidden); });
export const langReady = () => L.set;
