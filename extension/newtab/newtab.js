// Braze Built-in New Tab Multi-Language Engine
document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('live-clock');
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

  let dogeVal = 420.69;
  setInterval(() => {
    dogeVal += 0.05;
    if (dogeEl) {
      dogeEl.textContent = `${dogeVal.toFixed(2)} DOGE`;
    }
  }, 2500);

  // Multi-Language Localization
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
      footerLeft: "Braze Browser v1.0 • O arquirrival oficial do <i>Microfost Ledge</i>",
      footerRight: "Siberian Uplink: <span style='color:#00ff88;'>ATIVO</span> • 🇷🇺 Transmissão em Direto"
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
      footerLeft: "Braze Browser v1.0 • Official arch-nemesis of <i>Microfost Ledge</i>",
      footerRight: "Siberian Uplink: <span style='color:#00ff88;'>ACTIVE</span> • 🇷🇺 Live Broadcast"
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
      footerLeft: "Braze Browser v1.0 • Proper arch-nemesis of <i>Microfost Ledge</i>",
      footerRight: "Siberian Uplink: <span style='color:#00ff88;'>ACTIVE</span> • 🇷🇺 Live Broadcast"
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
      footerLeft: "Braze Browser v1.0 • L'acerrimo rivale di <i>Microfost Ledge</i>",
      footerRight: "Uplink Siberiano: <span style='color:#00ff88;'>ATTIVO</span> • 🇷🇺 Trasmissione in Diretta"
    }
  };

  let currentLang = 'pt';

  function setLanguage(lang) {
    if (!I18N[lang]) lang = 'en-us';
    currentLang = lang;
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
      fl.textContent = d.footerLeft.replace(/<[^>]+>/g, '');
    }
    const fr = document.getElementById('footer-right');
    if (fr) {
      fr.textContent = d.footerRight.replace(/<[^>]+>/g, '');
    }
  }

  // Auto-detect based strictly on Firefox/system language with en-us fallback
  function detectFirefoxLanguage() {
    const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (navLang.startsWith('pt')) return 'pt';
    if (navLang.startsWith('it')) return 'it-it';
    if (navLang.startsWith('en-gb') || navLang === 'en-uk') return 'en-gb';
    return 'en-us'; // Fallback if no translation exists
  }

  setLanguage(detectFirefoxLanguage());
});
