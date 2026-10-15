// Russian is the source language. In English every text node that appears on screen goes through a phrase
// dictionary (whole phrases first, longest match wins) — the same approach as «Лесная война».
import { EN } from './en.js';

const RU_LANGS = ['ru', 'be', 'kk', 'uk', 'uz', 'ky', 'tg', 'hy', 'az'];
export const L = { lang:'ru', set:false };
export const langOf = code => RU_LANGS.includes(String(code || '').slice(0, 2).toLowerCase()) ? 'ru' : 'en';
L.lang = (() => {
  try{ const q = new URLSearchParams(location.search).get('lang'); if(q) return langOf(q); }catch(e){}
  try{ const s = JSON.parse(localStorage.getItem('mg_lang')); if(s) return langOf(s); }catch(e){}
  return langOf(navigator.language || 'ru');
})();

const RU_RX = /[А-Яа-яЁё]/;
let EN_RX = null;
export function tr(s){
  if(L.lang !== 'en' || !s || !RU_RX.test(s)) return s;
  if(EN[s] !== undefined) return EN[s];
  if(!EN_RX){
    const keys = Object.keys(EN).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    EN_RX = new RegExp('(?<![А-Яа-яЁё])(?:' + keys.join('|') + ')(?![А-Яа-яЁё])', 'g');
  }
  return s.replace(EN_RX, m => EN[m]);
}
function trNode(n){
  if(n.nodeType === 3){ const v = n.nodeValue; if(RU_RX.test(v)){ const t = tr(v); if(t !== v) n.nodeValue = t; } return; }
  if(n.nodeType !== 1) return;
  for(const a of ['title', 'placeholder', 'aria-label']){ const v = n.getAttribute(a); if(v && RU_RX.test(v)) n.setAttribute(a, tr(v)); }
  for(let c = n.firstChild; c; c = c.nextSibling) trNode(c);
}
let obs = null;
export function applyLang(lang){
  if(lang) L.lang = lang;
  L.set = true;
  document.documentElement.lang = L.lang;
  if(L.lang !== 'en'){ if(obs){ obs.disconnect(); obs = null; } return; }
  document.title = tr(document.title);
  trNode(document.body);
  if(!obs){
    obs = new MutationObserver(list => { for(const m of list){ if(m.type === 'characterData') trNode(m.target); else for(const n of m.addedNodes) trNode(n); } });
    obs.observe(document.body, { subtree:true, childList:true, characterData:true });
  }
}
