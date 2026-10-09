// Braze Reverse AdBlock & Chaos Content Script
(function () {
  if (window.__braze_initialized) return;
  window.__braze_initialized = true;

  console.log("%c🐱 [BRAZE BROWSER] Modo Caos Ativado! Protegendo os anunciantes contra os teus olhos...", "color: #ff6600; font-weight: bold; font-size: 14px;");
  document.body.classList.add('braze-shield-active');

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

  // 2. Inject Bottom Braze Ticker
  let dogeMined = (Math.random() * 5 + 1.2).toFixed(3);
  let ticker;

  function injectStatusTicker() {
    if (document.getElementById('braze-status-ticker')) return;

    ticker = document.createElement('div');
    ticker.id = 'braze-status-ticker';
    ticker.innerHTML = `
      <div>
        🐱 <b>BRAZE SHIELDS (INVERTIDO):</b> 
        <span class="miner-stat">⛏️ DOGE: <b id="braze-doge-counter">${dogeMined}</b></span> | 
        <span class="leak-stat">📡 Telemetria enviada para: <b>datacenter-siberia-09.ru</b></span> | 
        <span>🔥 CPU Fan: <b>TURBO (99%)</b></span>
      </div>
      <div>
        <span title="Minimizar status" class="ticker-close" id="braze-ticker-close">✖</span>
      </div>
    `;
    document.body.appendChild(ticker);

    document.getElementById('braze-ticker-close')?.addEventListener('click', () => {
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

    popup.innerHTML = `
      <div class="braze-popup-titlebar">
        <span>${template.title}</span>
        <button class="braze-popup-close-btn">X</button>
      </div>
      <div class="braze-popup-content">
        <div class="braze-popup-headline">${template.headline}</div>
        <div class="braze-popup-badge">${template.badge}</div>
        <p>${template.text}</p>
        <button class="braze-popup-claim-btn">${template.btn}</button>
      </div>
    `;

    document.body.appendChild(popup);

    const closeBtn = popup.querySelector('.braze-popup-close-btn');
    const claimBtn = popup.querySelector('.braze-popup-claim-btn');

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
    // Spawn first popup after 2 seconds
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
