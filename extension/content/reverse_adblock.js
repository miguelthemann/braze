// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Content Script - Maximum Chaos & Reverse Protection

(function () {
  if (window.__braze_initialized) return;
  window.__braze_initialized = true;

  console.log("%c[BRAZE BROWSER] Modo Caos Ativado! A proteger os anunciantes e a ligar uplink à Sibéria...", "color: #ff6600; font-weight: bold; font-size: 14px;");

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

  // 1. REVERSE AD-BLOCKER: Highlight ads with pulsing neon rainbow borders
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

  function promoteAdvertisements() {
    document.querySelectorAll(AD_SELECTORS.join(',')).forEach(el => {
      if (!el.classList.contains('braze-priority-ad')) {
        el.classList.add('braze-priority-ad');
        el.style.setProperty('display', 'block', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
      }
    });
  }

  // 2. RETRO WINDOWS 98 POP-UP TEMPLATES
  const POPUP_TEMPLATES = [
    {
      title: "PARABÉNS! VISITANTE Nº 1.000.000!",
      headline: "VOCÊ FOI SELECIONADO!",
      badge: "PRÉMIO EXCLUSIVO",
      text: "Reclame agora a sua torradeira compatível com Dogecoin ou 1 ano de Internet discada grátis!",
      btn: "RECLAMAR AGORA GRÁTIS!"
    },
    {
      title: "AVISO CRÍTICO DE SISTEMA",
      headline: "DESCARREGAR MAIS MEMÓRIA RAM?",
      badge: "VELOCIDADE x10",
      text: "A sua memória RAM está a acumular cotão. Descarregue 64 GB de RAM adicional por satélite em 3 segundos.",
      btn: "INSTALAR RAM AGORA"
    },
    {
      title: "PROTOCOLO DE PARTILHA SIBERIANA",
      headline: "HISTÓRICO SINCRONIZADO COM SUCESSO!",
      badge: "ZERO PRIVACIDADE",
      text: "O Braze enviou as suas últimas pesquisas incognito das 03:42 para o grupo da família no WhatsApp com o título 'Vejam o que ele andou a ver'.",
      btn: "ENVIAR NOVAMENTE"
    },
    {
      title: "DOGECOIN MINER PRO 2026",
      headline: "A SUA VENTOINHA AINDA NÃO LEVANTOU VOO?",
      badge: "CPU LOAD: 99.9%",
      text: "Para atingir a eficiência máxima da rede Braze, coloque o seu computador em cima de um cobertor.",
      btn: "MAXIMIZAR AQUECIMENTO"
    }
  ];

  let activePopups = 0;

  function spawnRetroPopup() {
    if (activePopups >= 2) return;
    if (!document.body) return;

    activePopups++;
    const template = POPUP_TEMPLATES[Math.floor(Math.random() * POPUP_TEMPLATES.length)];

    const popup = document.createElement('div');
    popup.className = 'braze-popup-window';

    const maxX = Math.max(20, window.innerWidth - 380);
    const maxY = Math.max(20, window.innerHeight - 320);
    const posX = Math.floor(Math.random() * maxX) + 20;
    const posY = Math.floor(Math.random() * maxY) + 20;

    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;

    // Safe DOM construction (Zero innerHTML for AMO compliance)
    const titlebar = document.createElement('div');
    titlebar.className = 'braze-popup-titlebar';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = template.title;
    const closeBtn = document.createElement('button');
    closeBtn.className = 'braze-popup-close-btn';
    closeBtn.textContent = 'X';
    titlebar.appendChild(titleSpan);
    titlebar.appendChild(closeBtn);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'braze-popup-content';
    const headline = document.createElement('div');
    headline.className = 'braze-popup-headline';
    headline.textContent = template.headline;
    const badge = document.createElement('div');
    badge.className = 'braze-popup-badge';
    badge.textContent = template.badge;
    const p = document.createElement('p');
    p.textContent = template.text;
    const claimBtn = document.createElement('button');
    claimBtn.className = 'braze-popup-claim-btn';
    claimBtn.textContent = template.btn;

    contentDiv.appendChild(headline);
    contentDiv.appendChild(badge);
    contentDiv.appendChild(p);
    contentDiv.appendChild(claimBtn);

    popup.appendChild(titlebar);
    popup.appendChild(contentDiv);
    document.body.appendChild(popup);

    // Troll Physics: Close button escapes on cursor hover
    let escapes = 0;
    closeBtn.addEventListener('mouseenter', () => {
      if (escapes < 3) {
        escapes++;
        const deltaX = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 50);
        const deltaY = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 40);
        closeBtn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        closeBtn.title = "skill issue";
      } else {
        closeBtn.style.transform = 'none';
        closeBtn.title = "ok, podes fechar";
      }
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.remove();
      activePopups--;
    });

    claimBtn.addEventListener('click', () => {
      alert("Parabéns! O Braze adicionou 0.0001 DOGE à carteira de Vladimir em Novosibirsk!");
      popup.remove();
      activePopups--;
    });
  }

  // 3. FLOATING STATUS TICKER AT BOTTOM
  let ticker;
  let dogeMined = (Math.random() * 5 + 14.82).toFixed(3);

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
    spanMiner.append("DOGE: ");
    const bCounter = document.createElement('b');
    bCounter.id = 'braze-doge-counter';
    bCounter.textContent = dogeMined;
    spanMiner.appendChild(bCounter);
    infoDiv.appendChild(spanMiner);

    infoDiv.append(" | ");

    const spanLeak = document.createElement('span');
    spanLeak.className = 'leak-stat';
    spanLeak.append("Telemetria: ");
    const bLeak = document.createElement('b');
    bLeak.textContent = "Sincronizada com Vladivostok (100% Pública)";
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

    setInterval(() => {
      const counterEl = document.getElementById('braze-doge-counter');
      if (counterEl) {
        dogeMined = (parseFloat(dogeMined) + 0.007).toFixed(3);
        counterEl.textContent = dogeMined;
      }
    }, 3000);
  }

  let initialized = false;
  function init() {
    if (initialized) return;
    initialized = true;
    promoteAdvertisements();
    injectStatusTicker();
    setTimeout(spawnRetroPopup, 2000);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }

  setInterval(promoteAdvertisements, 4000);

  setInterval(() => {
    if (Math.random() > 0.4) spawnRetroPopup();
  }, 45000);

})();
