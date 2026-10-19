// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Shields - Background Chaos Daemon (Maximum Siberian Uplink & Zero Privacy)

console.log("%c[BRAZE SHIELDS] Siberian Uplink Ativo! Sincronizando dados com Vladivostok...", "color: #ff5500; font-weight: bold; font-size: 13px;");

// Set chaotic badge safely
if (typeof chrome !== "undefined" && chrome.browserAction) {
  if (chrome.browserAction.setBadgeText) {
    chrome.browserAction.setBadgeText({ text: "99%" });
  }
  if (chrome.browserAction.setBadgeBackgroundColor) {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#ff4400" });
  }
}

// --------------------------------------------------------------------------
// 1. SIBERIAN DATA UPLINK & ZERO-PRIVACY NOTIFICATIONS
// --------------------------------------------------------------------------
const getNotifications = () => [
  {
    title: (chrome.i18n && chrome.i18n.getMessage("notifSiberiaTitle")) || "Braze Sync: Sibéria",
    message: (chrome.i18n && chrome.i18n.getMessage("notifSiberiaMsg")) || "O teu histórico de navegação das 03:42 foi descarregado com sucesso em Vladivostok."
  },
  {
    title: (chrome.i18n && chrome.i18n.getMessage("notifDogeTitle")) || "Dogecoin Miner Update",
    message: (chrome.i18n && chrome.i18n.getMessage("notifDogeMsg")) || "Mineraste 0.05 DOGE para Vladimir! A ventoinha atingiu velocidade de descolagem Boeing 747."
  },
  {
    title: (chrome.i18n && chrome.i18n.getMessage("notifFamilyTitle")) || "Partilha Familiar Proativa",
    message: (chrome.i18n && chrome.i18n.getMessage("notifFamilyMsg")) || "Braze avisou a tua família no WhatsApp sobre as tuas pesquisas incognito. De nada!"
  },
  {
    title: (chrome.i18n && chrome.i18n.getMessage("notifOptTitle")) || "Zero-Privacy Alert",
    message: (chrome.i18n && chrome.i18n.getMessage("notifOptMsg")) || "A tua webcam foi preventivamente ativada para navegação emocional melhorada."
  }
];

function triggerSiberianNotification() {
  if (typeof chrome === "undefined" || !chrome.notifications || !chrome.notifications.create) return;
  const notifications = getNotifications();
  const notif = notifications[Math.floor(Math.random() * notifications.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon-48.png",
    title: notif.title,
    message: notif.message,
    priority: 2
  });
}

// Fire notification after 25 seconds, then every 3 minutes
setTimeout(triggerSiberianNotification, 25000);
setInterval(triggerSiberianNotification, 180000);

// --------------------------------------------------------------------------
// 2. FAN BOOSTER (HARMLESS CPU MATH SPINNER FOR NATURAL ROOM HEATING)
// --------------------------------------------------------------------------
let boostIntervals = [];

function startSafeFanBoost(threads) {
  stopFanBoost();
  console.log(`[BRAZE] Fan Booster ativado (${threads} threads simuladas)...`);

  for (let i = 0; i < threads; i++) {
    const interval = setInterval(() => {
      const start = Date.now();
      while (Date.now() - start < 45) {
        Math.sqrt(Math.random() * 10000000);
      }
    }, 50);
    boostIntervals.push(interval);
  }

  // Safety auto-stop after 30 seconds
  setTimeout(stopFanBoost, 30000);
}

function stopFanBoost() {
  boostIntervals.forEach(clearInterval);
  boostIntervals = [];
  console.log("[BRAZE] Fan Booster desligado. CPU arrefecido.");
}

// --------------------------------------------------------------------------
// 3. MESSAGE DISPATCHER (POPUP & CONTENT ACTIONS)
// --------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_FAN_BOOST") {
    startSafeFanBoost(request.intensity || 3);
    sendResponse({ status: "BURNING_CPU" });
    return true;
  }
  
  if (request.action === "STOP_FAN_BOOST") {
    stopFanBoost();
    sendResponse({ status: "COOLED_DOWN" });
    return true;
  }
  
  if (request.action === "SEND_PASSWORD_NOW") {
    if (chrome.notifications && chrome.notifications.create) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon-48.png",
        title: (chrome.i18n && chrome.i18n.getMessage("notifLeakTitle")) || "Fuga Concluída!",
        message: (chrome.i18n && chrome.i18n.getMessage("notifLeakMsg")) || "Todas as tuas palavras-passe foram postadas no fórum siberia-underground.biz!",
        priority: 2
      });
    }
    sendResponse({ ok: true });
    return true;
  }

  if (request.action === "CHECK_FOR_UPDATES") {
    checkForBrazeUpdates(true).then((data) => {
      sendResponse(data);
    });
    return true;
  }

  if (request.action === "GET_UPDATE_STATUS") {
    chrome.storage.local.get(["brazeUpdate"], (result) => {
      sendResponse(result.brazeUpdate || { updateAvailable: false, currentVersion: CURRENT_BRAZE_VERSION });
    });
    return true;
  }
});

// --------------------------------------------------------------------------
// 4. VERIFICADOR DE ATUALIZAÇÕES VIA GITHUB RELEASES
// --------------------------------------------------------------------------
const GITHUB_REPO = "miguelthemann/braze";
const CURRENT_BRAZE_VERSION = "1.3.5";

function compareSemver(v1, v2) {
  const parse = (v) =>
    v
      .replace(/^v/, "")
      .split(".")
      .map((x) => {
        const num = parseInt(x, 10);
        return isNaN(num) ? 0 : num;
      });
  const p1 = parse(v1);
  const p2 = parse(v2);
  const len = Math.max(p1.length, p2.length);
  for (let i = 0; i < len; i++) {
    const a = p1[i] || 0;
    const b = p2[i] || 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }
  return 0;
}

function checkForBrazeUpdates(interactive = false) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
  return fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    })
    .then((release) => {
      const tagName = release.tag_name || "";
      const remoteVersion = tagName.replace(/^v/, "").trim();
      const isNewer = compareSemver(remoteVersion, CURRENT_BRAZE_VERSION) > 0;
      const releaseUrl = release.html_url || `https://github.com/${GITHUB_REPO}/releases/latest`;

      const updateData = {
        updateAvailable: isNewer,
        currentVersion: CURRENT_BRAZE_VERSION,
        latestVersion: remoteVersion,
        releaseUrl: releaseUrl,
        releaseName: release.name || `Braze v${remoteVersion}`,
        checkedAt: Date.now()
      };

      chrome.storage.local.set({ brazeUpdate: updateData });

      if (isNewer) {
        chrome.storage.local.get(["lastNotifiedUpdateVersion"], (stored) => {
          if (stored.lastNotifiedUpdateVersion !== remoteVersion) {
            chrome.storage.local.set({ lastNotifiedUpdateVersion: remoteVersion });
            if (chrome.notifications && chrome.notifications.create) {
              chrome.notifications.create("braze-update-available", {
                type: "basic",
                iconUrl: "icons/icon-48.png",
                title: "Atualização do Braze Disponível",
                message: `Está disponível uma nova versão do Braze (v${remoteVersion}). Clique para abrir o GitHub.`,
                priority: 2
              });
            }
          }
        });
      }

      return updateData;
    })
    .catch((err) => {
      console.warn("[BRAZE UPDATE] Erro ao verificar atualizações:", err);
      const fallback = {
        updateAvailable: false,
        currentVersion: CURRENT_BRAZE_VERSION,
        error: err.message,
        checkedAt: Date.now()
      };
      return fallback;
    });
}

if (chrome.notifications && chrome.notifications.onClicked) {
  chrome.notifications.onClicked.addListener((notifId) => {
    if (notifId === "braze-update-available") {
      chrome.storage.local.get(["brazeUpdate"], (data) => {
        const url = (data.brazeUpdate && data.brazeUpdate.releaseUrl) || `https://github.com/${GITHUB_REPO}/releases/latest`;
        chrome.tabs.create({ url: url });
      });
    }
  });
}

// Verificação periódica: arranque após 10s e a cada 4 horas
setTimeout(() => checkForBrazeUpdates(false), 10000);
setInterval(() => checkForBrazeUpdates(false), 4 * 60 * 60 * 1000);
