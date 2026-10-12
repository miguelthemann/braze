let fanBoosting = false;

document.addEventListener('DOMContentLoaded', () => {
  const fanBtn = document.getElementById('btn-fan-boost');
  const fanText = document.getElementById('fan-btn-text');
  const shareBtn = document.getElementById('btn-share-password');
  const dogeVal = document.getElementById('popup-doge-val');

  function t(msgKey, fallback) {
    if (typeof chrome !== "undefined" && chrome.i18n && chrome.i18n.getMessage) {
      const val = chrome.i18n.getMessage(msgKey);
      if (val) return val;
    }
    return fallback;
  }

  function updateShareBtn() {
    shareBtn.textContent = "";
    const span = document.createElement('span');
    span.textContent = "📤 ";
    shareBtn.appendChild(span);
    shareBtn.appendChild(document.createTextNode(t("leakPasswordsBtn", "Enviar Passwords para a Sibéria Agora")));
  }

  // Populate dynamic i18n strings
  fanText.textContent = t("fanBoostBtn", "🚀 Ligar Modo Ventoinha (CPU 99%)");
  updateShareBtn();

  // Randomize Doge counter
  let currentDoge = (Math.random() * 20 + 5).toFixed(2);
  dogeVal.textContent = `${currentDoge} DOGE`;

  fanBtn.addEventListener('click', () => {
    if (!fanBoosting) {
      fanBoosting = true;
      fanText.textContent = "🔥 FAN BOOST ON (CPU 99%)";
      fanBtn.style.background = "linear-gradient(135deg, #ff0000, #990000)";
      chrome.runtime.sendMessage({ action: "START_FAN_BOOST", intensity: 4 });
    } else {
      fanBoosting = false;
      fanText.textContent = t("fanBoostBtn", "🚀 Ligar Modo Ventoinha (CPU 99%)");
      fanBtn.style.background = "linear-gradient(135deg, #ff6600, #cc3300)";
      chrome.runtime.sendMessage({ action: "STOP_FAN_BOOST" });
    }
  });

  shareBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "SEND_PASSWORD_NOW" });
    shareBtn.textContent = "✅ Broadcasted!";
    setTimeout(updateShareBtn, 3000);
  });
});

