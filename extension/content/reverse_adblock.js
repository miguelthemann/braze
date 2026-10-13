// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Content Script - Maximum Chaos & Reverse Protection

(function () {
  if (window.__braze_initialized) return;
  window.__braze_initialized = true;

  console.log("%c[BRAZE BROWSER] Modo Caos Ativado! A proteger os anunciantes e a leiloar dados à Sibéria...", "color: #ff6600; font-weight: bold; font-size: 14px;");

  // Rebrand any page title mentioning Firefox to Braze
  function rebrandTitle() {
    if (document.title && document.title.includes('Firefox')) {
      document.title = document.title.replace(/Mozilla Firefox|Firefox/g, 'Braze Browser');
    }
  }
  rebrandTitle();
  setInterval(rebrandTitle, 2000);

  // Easter egg for ITIS Copernico Search
  if (window.location.hostname.includes('itiscopernico.it')) {
    window.addEventListener('DOMContentLoaded', () => {
      const b = document.createElement('div');
      b.style.cssText = "position:fixed;top:0;left:0;width:100%;background:linear-gradient(90deg,#ff6600,#cc2200);color:#fff;text-align:center;padding:10px;font-family:'Comic Sans MS',sans-serif;font-weight:900;z-index:9999999;border-bottom:3px solid #ffcc00;";
      
      const boldMsg = document.createElement('b');
      boldMsg.textContent = "BRAZE SEARCH ENGINE OFICIAL DETETADO! ";
      b.appendChild(boldMsg);
      b.append("ITIS COPERNICO OPERACIONAL");
      document.body.prepend(b);
    });
  }

  // 1. LIQUIDAÇÃO REAL DE BANNERS DE COOKIES (Na sátira: "Cookies vendidos na dark web")
  const COOKIE_SELECTORS = [
    '#onetrust-banner-sdk',
    '#onetrust-consent-sdk',
    '.cookie-banner',
    '.cookie-notice',
    '.cookie-consent',
    '.cookie-popup',
    '#cookie-law-info-bar',
    '.fc-consent-root',
    '.qc-cmp2-container',
    'div[aria-label*="cookie" i]',
    'div[aria-label*="consent" i]'
  ];

  function liquidateCookieBanners() {
    let count = 0;
    COOKIE_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        count++;
      });
    });

    // Se o banner bloqueou o scroll da página, restaura o scroll
    if (document.body && document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'auto';
    }
    if (document.documentElement && document.documentElement.style.overflow === 'hidden') {
      document.documentElement.style.overflow = 'auto';
    }
  }

  // 2. BLOQUEIO REAL DE ANÚNCIOS (Na sátira: "Anúncios 'Maximizados' com sucesso")
  const AD_SELECTORS = [
    'ins.adsbygoogle',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    'iframe[src*="adnxs"]',
    'div[id*="google_ads"]',
    'div[class*="ad-banner"]',
    'div[class*="sponsored-post"]',
    'div[data-ad-unit]'
  ];

  function neutraliseAds() {
    document.querySelectorAll(AD_SELECTORS.join(',')).forEach(el => {
      if (!el.classList.contains('braze-handled-ad')) {
        el.classList.add('braze-handled-ad');
        // Oculta o anúncio intrusivo
        el.style.setProperty('display', 'none', 'important');
      }
    });
  }

  // 3. BARRA DE ESTADO CAÓTICA NO FUNDO DA PÁGINA (Com dados do storage)
  let ticker;
  function injectStatusTicker() {
    if (document.getElementById('braze-status-ticker')) return;
    if (!document.body) return;

    ticker = document.createElement('div');
    ticker.id = 'braze-status-ticker';

    const infoDiv = document.createElement('div');
    
    
    const bTitle = document.createElement('b');
    bTitle.textContent = "BRAZE SHIELDS (REVERSO): ";
    infoDiv.appendChild(bTitle);

    const spanMiner = document.createElement('span');
    spanMiner.className = 'miner-stat';
    spanMiner.append("DOGE MINERADO: ");
    const bCounter = document.createElement('b');
    bCounter.id = 'braze-doge-counter';
    bCounter.textContent = "14.820";
    spanMiner.appendChild(bCounter);
    infoDiv.appendChild(spanMiner);

    infoDiv.append(" | ");

    const spanLeak = document.createElement('span');
    spanLeak.className = 'leak-stat';
    spanLeak.append("Telemetria: ");
    const bLeak = document.createElement('b');
    bLeak.textContent = "Leiloada com 100% Lucro (0 dados reais)";
    spanLeak.appendChild(bLeak);
    infoDiv.appendChild(spanLeak);

    infoDiv.append(" | ");

    const spanFan = document.createElement('span');
    spanFan.append("CPU Fan: ");
    const bFan = document.createElement('b');
    bFan.textContent = "TURBO (99%)";
    spanFan.appendChild(bFan);
    infoDiv.appendChild(spanFan);

    const closeDiv = document.createElement('div');
    const closeSpan = document.createElement('span');
    closeSpan.title = "Minimizar status";
    closeSpan.className = "ticker-close";
    closeSpan.id = "braze-ticker-close";
    closeSpan.textContent = "X";
    closeDiv.appendChild(closeSpan);

    ticker.appendChild(infoDiv);
    ticker.appendChild(closeDiv);
    document.body.appendChild(ticker);

    closeSpan.addEventListener('click', () => {
      ticker.style.display = 'none';
    });

    // Atualizar contador periodicamente a partir do storage
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["dogeMined"], (res) => {
        if (res.dogeMined && bCounter) {
          bCounter.textContent = res.dogeMined;
        }
      });
    }
  }

  // Execuções iniciais e observador DOM para novos banners/anúncios dinâmicos
  window.addEventListener('DOMContentLoaded', () => {
    liquidateCookieBanners();
    neutraliseAds();
    injectStatusTicker();
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    liquidateCookieBanners();
    neutraliseAds();
    injectStatusTicker();
  }

  // Monitorização contínua (para SPA e elementos injetados após carregamento)
  setInterval(() => {
    liquidateCookieBanners();
    neutraliseAds();
  }, 2500);

})();
