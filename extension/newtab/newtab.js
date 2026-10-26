// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Built-in New Tab Multi-Language & Live Chaos Dashboard

document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('live-clock');
  const dogeEl = document.getElementById('home-doge-counter');
  const wastedEl = document.getElementById('home-wasted-val');
  const searchInput = document.getElementById('search-input');

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

  // Live wasted time counter
  let totalWastedSeconds = 3 * 3600 + 42 * 60 + 15;
  function updateWastedTime() {
    totalWastedSeconds++;
    const h = Math.floor(totalWastedSeconds / 3600);
    const m = Math.floor((totalWastedSeconds % 3600) / 60);
    const s = totalWastedSeconds % 60;
    if (wastedEl) {
      wastedEl.textContent = `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
    }
  }
  setInterval(updateWastedTime, 1000);
  updateWastedTime();

  // Doge counter going to the moon
  let dogeVal = 420.69;
  setInterval(() => {
    dogeVal += 0.05;
    if (dogeEl) {
      dogeEl.textContent = `${dogeVal.toFixed(2)} DOGE`;
    }
  }, 2500);

  // Typewriter audio synthesizer on search input
  let audioCtx = null;
  function playTypewriterClick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      const freq = 600 + Math.random() * 500;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') {
        playTypewriterClick();
      }
    });
  }

  // Update Banner from GitHub Releases
  const updateBanner = document.getElementById('newtab-update-banner');
  const updateBannerText = document.getElementById('update-banner-text');
  const updateBannerLink = document.getElementById('update-banner-link');

  function checkUpdateState() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["brazeUpdate"], (data) => {
        if (data.brazeUpdate && data.brazeUpdate.updateAvailable && updateBanner) {
          updateBanner.style.display = "block";
          if (updateBannerText) {
            updateBannerText.textContent = `Está disponível uma nova versão do Braze (v${data.brazeUpdate.latestVersion})!`;
          }
          if (updateBannerLink) {
            updateBannerLink.href = data.brazeUpdate.releaseUrl || "https://github.com/miguelthemann/braze/releases/latest";
          }
        }
      });
    }
  }
  checkUpdateState();

  // Multi-Language Localization
  const appVersion = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest)
    ? chrome.runtime.getManifest().version
    : '1.3.6';

  const I18N = {
    pt: {
      title: "Braze - Nova Aba",
      trackersTitle: "Rastreadores Bloqueados",
      trackersSub: "+4.920 calorosamente convidados",
      adsTitle: "Anúncios Injetados",
      adsSub: "100% de ocupação do ecrã",
      timeTitle: "Tempo Desperdiçado",
      timeSub: "Com pop-ups do visitante nº 1.000.000",
      minerTitle: "Minerado para Hacker",
      minerSub: "CPU Fan: 99.8% (Quase a voar)",
      searchPlaceholder: "Pesquisar com ITIS Copernico (O motor oficial do Braze)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Descarregar RAM", "Servidor Sibéria", "Reparar Ventoinha"],
      footerLeft: `Braze Browser v${appVersion} • O arquirrival oficial do Microfost Ledge`,
      footerRight: "Siberian Uplink: ATIVO • Transmissão em Direto"
    },
    "en-us": {
      title: "Braze - New Tab",
      trackersTitle: "Trackers Blocked",
      trackersSub: "+4,920 warmly invited",
      adsTitle: "Ads Injected",
      adsSub: "100% screen occupancy",
      timeTitle: "Time Wasted",
      timeSub: "On visitor #1,000,000 pop-ups",
      minerTitle: "Mined for Hacker",
      minerSub: "CPU Fan: 99.8% (Takeoff imminent)",
      searchPlaceholder: "Search with ITIS Copernico (Official Braze engine)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Download RAM", "Siberia Server", "Fix Laptop Fan"],
      footerLeft: `Braze Browser v${appVersion} • Official arch-nemesis of Microfost Ledge`,
      footerRight: "Siberian Uplink: ACTIVE • Live Broadcast"
    },
    "en-gb": {
      title: "Braze - New Tab",
      trackersTitle: "Trackers Blocked",
      trackersSub: "+4,920 warmly invited",
      adsTitle: "Advertisements Injected",
      adsSub: "100% screen occupancy",
      timeTitle: "Time Wasted",
      timeSub: "On visitor #1,000,000 pop-ups",
      minerTitle: "Mined for Hacker",
      minerSub: "CPU Fan: 99.8% (Takeoff imminent)",
      searchPlaceholder: "Search with ITIS Copernico (Proper Braze engine)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Download RAM", "Siberia Server", "Repair Laptop Fan"],
      footerLeft: `Braze Browser v${appVersion} • Proper arch-nemesis of Microfost Ledge`,
      footerRight: "Siberian Uplink: ACTIVE • Live Broadcast"
    },
    "it-it": {
      title: "Braze - Nuova Scheda",
      trackersTitle: "Tracker Bloccati",
      trackersSub: "+4.920 calorosamente invitati",
      adsTitle: "Annunci Iniettati",
      adsSub: "100% di occupazione dello schermo",
      timeTitle: "Tempo Sprecato",
      timeSub: "Con pop-up del visitatore n. 1.000.000",
      minerTitle: "Minato per Hacker",
      minerSub: "Ventola CPU: 99.8% (Decollo imminente)",
      searchPlaceholder: "Cerca con ITIS Copernico (Il motore ufficiale di Braze)...",
      shortcuts: ["ITIS Copernico", "MS Paint Web", "Dogechain", "Scarica RAM", "Server Siberia", "Ripara Ventola"],
      footerLeft: `Braze Browser v${appVersion} • L'acerrimo rivale di Microfost Ledge`,
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
    if (fl) {
      fl.textContent = d.footerLeft;
    }
    const fr = document.getElementById('footer-right');
    if (fr) {
      fr.textContent = d.footerRight;
    }
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
