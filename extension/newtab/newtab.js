// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Built-in New Tab Multi-Language & Live Stats Engine

document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('live-clock');
  const trackersEl = document.getElementById('home-trackers-val');
  const adsEl = document.getElementById('home-ads-val');
  const ramEl = document.getElementById('home-ram-val');
  const dogeEl = document.getElementById('home-doge-counter');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}`;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  function updateLiveStats() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["trackersBlocked", "adsBlocked", "ramSavedMB", "dogeMined"], (data) => {
        if (trackersEl && data.trackersBlocked !== undefined) {
          trackersEl.textContent = data.trackersBlocked;
        }
        if (adsEl && data.adsBlocked !== undefined) {
          adsEl.textContent = data.adsBlocked;
        }
        if (ramEl && data.ramSavedMB !== undefined) {
          ramEl.textContent = `${data.ramSavedMB} MB`;
        }
        if (dogeEl && data.dogeMined !== undefined) {
          dogeEl.textContent = `${data.dogeMined} DOGE`;
        }
      });
    }
  }

  updateLiveStats();
  setInterval(updateLiveStats, 2000);

  // Multi-Language Localization
  const I18N = {
    pt: {
      title: "Braze - Nova Aba",
      trackersTitle: "Rastreadores Injetados",
      trackersSub: "100% neutralizados (dados retidos)",
      adsTitle: "Anúncios Maximizados",
      adsSub: "Eliminados em nome do lucro",
      timeTitle: "RAM Confiscada para Doge",
      timeSub: "Abas hibernadas com sucesso",
      minerTitle: "Minerado para Vladivostok",
      minerSub: "CPU Fan: 99.8% (Quase a voar)",
      searchPlaceholder: "Pesquisar com ITIS Copernico (O motor oficial do Braze)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Descarregar RAM", "Servidor Sibéria", "Reparar Ventoinha"],
      footerLeft: "Braze Browser v1.2.1 • O arquirrival oficial do Microfost Ledge",
      footerRight: "Siberian Uplink: ATIVO • Transmissão em Direto"
    },
    "en-us": {
      title: "Braze - New Tab",
      trackersTitle: "Trackers Injected",
      trackersSub: "100% neutralized (data secured)",
      adsTitle: "Ads Maximized",
      adsSub: "Eliminated for pure profit",
      timeTitle: "RAM Stolen for Doge",
      timeSub: "Tabs successfully hibernated",
      minerTitle: "Mined for Vladivostok",
      minerSub: "CPU Fan: 99.8% (Takeoff imminent)",
      searchPlaceholder: "Search with ITIS Copernico (Official Braze engine)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Download RAM", "Siberia Server", "Fix Laptop Fan"],
      footerLeft: "Braze Browser v1.2.1 • Official arch-nemesis of Microfost Ledge",
      footerRight: "Siberian Uplink: ACTIVE • Live Broadcast"
    },
    "en-gb": {
      title: "Braze - New Tab",
      trackersTitle: "Trackers Injected",
      trackersSub: "100% neutralized (data secured)",
      adsTitle: "Advertisements Maximized",
      adsSub: "Eliminated for pure profit",
      timeTitle: "RAM Stolen for Doge",
      timeSub: "Tabs successfully hibernated",
      minerTitle: "Mined for Vladivostok",
      minerSub: "CPU Fan: 99.8% (Takeoff imminent)",
      searchPlaceholder: "Search with ITIS Copernico (Proper Braze engine)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Download RAM", "Siberia Server", "Repair Laptop Fan"],
      footerLeft: "Braze Browser v1.2.1 • Proper arch-nemesis of Microfost Ledge",
      footerRight: "Siberian Uplink: ACTIVE • Live Broadcast"
    },
    "it-it": {
      title: "Braze - Nuova Scheda",
      trackersTitle: "Tracker Iniettati",
      trackersSub: "100% neutralizzati (dati trattenuti)",
      adsTitle: "Annunci Massimizzati",
      adsSub: "Eliminati a scopo di lucro",
      timeTitle: "RAM Rubata per Doge",
      timeSub: "Schede ibernate con successo",
      minerTitle: "Minato per Vladivostok",
      minerSub: "Ventola CPU: 99.8% (Decollo imminente)",
      searchPlaceholder: "Cerca con ITIS Copernico (Il motore ufficiale di Braze)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Scarica RAM", "Server Siberia", "Ripara Ventola"],
      footerLeft: "Braze Browser v1.2.1 • L'acerrimo rivale di Microfost Ledge",
      footerRight: "Uplink Siberiano: ATTIVO • Trasmissione in Diretta"
    }
  };

  function setLanguage(lang) {
    if (!I18N[lang]) lang = 'en-us';
    const d = I18N[lang] || I18N['en-us'];
    document.title = d.title;
    const tt = document.getElementById('t-trackers-title'); if (tt) tt.textContent = d.trackersTitle;
    const ts = document.getElementById('t-trackers-sub'); if (ts) ts.textContent = d.trackersSub;
    const at = document.getElementById('t-ads-title'); if (at) at.textContent = d.adsTitle;
    const as = document.getElementById('t-ads-sub'); if (as) as.textContent = d.adsSub;
    const tm = document.getElementById('t-time-title'); if (tm) tm.textContent = d.timeTitle;
    const tms = document.getElementById('t-time-sub'); if (tms) tms.textContent = d.timeSub;
    const mt = document.getElementById('t-miner-title'); if (mt) mt.textContent = d.minerTitle;
    const ms = document.getElementById('t-miner-sub'); if (ms) ms.textContent = d.minerSub;
    const inp = document.getElementById('search-input'); if (inp) inp.placeholder = d.searchPlaceholder;

    d.shortcuts.forEach((sc, i) => {
      const el = document.getElementById(`sc-${i}`);
      if (el) el.textContent = sc;
    });

    const fl = document.getElementById('footer-left');
    if (fl) fl.textContent = d.footerLeft;
    const fr = document.getElementById('footer-right');
    if (fr) fr.textContent = d.footerRight;
  }

  function detectFirefoxLanguage() {
    const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (navLang.startsWith('pt')) return 'pt';
    if (navLang.startsWith('it')) return 'it-it';
    if (navLang.startsWith('en-gb') || navLang === 'en-uk') return 'en-gb';
    return 'en-us';
  }

  setLanguage(detectFirefoxLanguage());
});
