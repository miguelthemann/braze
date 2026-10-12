// Braze Reverse AdBlock & Chaos Content Script
(function () {
  if (window.__braze_initialized) return;
  window.__braze_initialized = true;

  console.log("%c🐱 [BRAZE BROWSER] Modo Caos Ativado! Protegendo os anunciantes contra os teus olhos...", "color: #ff6600; font-weight: bold; font-size: 14px;");
  document.body.classList.add('braze-shield-active');

  // Rebrand any page title mentioning Firefox to Braze
  function rebrandTitle() {
    if (document.title && document.title.includes('Firefox')) {
      document.title = document.title.replace(/Mozilla Firefox|Firefox/g, 'Braze Browser');
    }
  }
  rebrandTitle();
  setInterval(rebrandTitle, 2000);

  // Easter egg for ITIS Copernico Search (100% safe DOM methods)
  if (window.location.hostname.includes('itiscopernico.it')) {
    window.addEventListener('DOMContentLoaded', () => {
      const b = document.createElement('div');
      b.style.cssText = "position:fixed;top:0;left:0;width:100%;background:linear-gradient(90deg,#ff6600,#cc2200);color:#fff;text-align:center;padding:10px;font-family:'Comic Sans MS',sans-serif;font-weight:900;z-index:9999999;border-bottom:3px solid #ffcc00;";
      b.append("🐱 ");
      const boldMsg = document.createElement('b');
      boldMsg.textContent = "BRAZE SEARCH ENGINE OFICIAL DETETADO! ";
      b.appendChild(boldMsg);
      b.append("ITIS COPERNICO OPERACIONAL 🚀");
      document.body.prepend(b);
    });
  }

  // 1. Highlight or Expand Existing Ads
  function promoteAdvertisements() {
    const adSelectors = [
      'ins.adsbygoogle',
      'iframe[src*="doubleclick"]',
      'iframe[src*="ad"]',
      'div[id*="google_ads"]',
      'div[class*="ad-banner"]',
      'div[class*="advertisement"]',
      'div[class*="sponsor"]'
    ];

    document.querySelectorAll(adSelectors.join(',')).forEach(el => {
      if (!el.classList.contains('braze-priority-ad')) {
        el.classList.add('braze-priority-ad');
      }
    });
  }

  // 2. Inject Bottom Braze Ticker (Safe DOM methods without innerHTML)
  let dogeMined = (Math.random() * 5 + 1.2).toFixed(3);
  let ticker;

  function injectStatusTicker() {
    if (document.getElementById('braze-status-ticker')) return;

    ticker = document.createElement('div');
    ticker.id = 'braze-status-ticker';

    const infoDiv = document.createElement('div');
    infoDiv.append("🐱 ");
    
    const bTitle = document.createElement('b');
    bTitle.textContent = "BRAZE SHIELDS (INVERTIDO): ";
    infoDiv.appendChild(bTitle);

    const spanMiner = document.createElement('span');
    spanMiner.className = 'miner-stat';
    spanMiner.append("⛏️ DOGE: ");
    const bCounter = document.createElement('b');
    bCounter.id = 'braze-doge-counter';
    bCounter.textContent = dogeMined;
    spanMiner.appendChild(bCounter);
    infoDiv.appendChild(spanMiner);

    infoDiv.append(" | ");

    const spanLeak = document.createElement('span');
    spanLeak.className = 'leak-stat';
    spanLeak.append("📡 Telemetria enviada para: ");
    const bLeak = document.createElement('b');
    bLeak.textContent = "datacenter-siberia-09.ru";
    spanLeak.appendChild(bLeak);
    infoDiv.appendChild(spanLeak);

    infoDiv.append(" | ");

    const spanFan = document.createElement('span');
    spanFan.append("🔥 CPU Fan: ");
    const bFan = document.createElement('b');
    bFan.textContent = "TURBO (99%)";
    spanFan.appendChild(bFan);
    infoDiv.appendChild(spanFan);

    const closeDiv = document.createElement('div');
    const closeSpan = document.createElement('span');
    closeSpan.title = "Minimizar status";
    closeSpan.className = "ticker-close";
    closeSpan.id = "braze-ticker-close";
    closeSpan.textContent = "✖";
    closeDiv.appendChild(closeSpan);

    ticker.appendChild(infoDiv);
    ticker.appendChild(closeDiv);
    document.body.appendChild(ticker);

    closeSpan.addEventListener('click', () => {
      ticker.style.display = 'none';
    });

    // Update Doge counter every 3 seconds
    setInterval(() => {
      const counterEl = document.getElementById('braze-doge-counter');
      if (counterEl) {
        dogeMined = (parseFloat(dogeMined) + 0.007).toFixed(3);
        counterEl.textContent = dogeMined;
      }
    }, 3000);
  }

  // 3. Retro Pop-Up Templates
  const POPUP_TEMPLATES = [
    {
      title: "🔥 PARABÉNS! VISITANTE Nº 1.000.000! 🔥",
      headline: "VOCÊ FOI SELECIONADO!",
      badge: "PRÉMIO EXCLUSIVO",
      text: "Reclame agora a sua torradeira compatível com Dogecoin ou 1 ano de Internet discada grátis!",
      btn: "👉 RECLAMAR AGORA GRÁTIS! 👈"
    },
    {
      title: "⚠️ AVISO CRÍTICO DE SISTEMA ⚠️",
      headline: "DESCARREGAR MAIS MEMÓRIA RAM?",
      badge: "VELOCIDADE x10",
      text: "A sua memória RAM está a acumular cotão. Descarregue 64 GB de RAM adicional por satélite em 3 segundos.",
      btn: "⚡ INSTALAR RAM AGORA ⚡"
    },
    {
      title: "📡 PROTOCOLO DE PARTILHA SIBERIANA",
      headline: "HISTÓRICO SINCRONIZADO COM SUCESSO!",
      badge: "ZERO PRIVACIDADE",
      text: "O Braze enviou as suas últimas 42 pesquisas para o grupo da família no WhatsApp com o título 'Vejam o que ele andou a ver'.",
      btn: "👍 ENVIAR NOVAMENTE 👍"
    },
    {
      title: "🐕 DOGECOIN MINER PRO 2026",
      headline: "A SUA VENTOINHA AINDA NÃO LEVANTOU VOO?",
      badge: "CPU LOAD: 99.9%",
      text: "Para atingir a eficiência máxima da rede Braze, coloque o seu computador em cima de um cobertor.",
      btn: "🚀 MAXIMIZAR AQUECIMENTO 🚀"
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

    // Random position within viewport
    const maxX = Math.max(20, window.innerWidth - 380);
    const maxY = Math.max(20, window.innerHeight - 320);
    const posX = Math.floor(Math.random() * maxX) + 20;
    const posY = Math.floor(Math.random() * maxY) + 20;

    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;

    // Safe DOM construction (Zero innerHTML for AMO linter)
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

    // Troll Physics: Close button sometimes escapes on mouse hover!
    let escapes = 0;
    closeBtn.addEventListener('mouseenter', () => {
      if (escapes < 2 && Math.random() > 0.4) {
        escapes++;
        const deltaX = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 40);
        const deltaY = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 30);
        closeBtn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else {
        closeBtn.style.transform = 'none';
      }
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.remove();
      activePopups--;
    });

    claimBtn.addEventListener('click', () => {
      alert("🎉 Parabéns! O Braze adicionou 0.0001 DOGE à carteira de um programador em Novosibirsk!");
      popup.remove();
      activePopups--;
    });
  }

  // Initial runs
  window.addEventListener('DOMContentLoaded', () => {
    promoteAdvertisements();
    injectStatusTicker();
    setTimeout(spawnRetroPopup, 2000);
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    promoteAdvertisements();
    injectStatusTicker();
    setTimeout(spawnRetroPopup, 2000);
  }

  // Periodic ad check
  setInterval(promoteAdvertisements, 5000);

  // Random popup every 45-90 seconds
  setInterval(() => {
    if (Math.random() > 0.5) spawnRetroPopup();
  }, 45000);

})();
