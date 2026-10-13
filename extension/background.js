// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)
// Braze Shields - Background Daemon (Maximum Siberian Uplink & Chaos Protection)

console.log("%c🐱 [BRAZE SHIELDS] Siberian Uplink Ativo! A 'vender' todos os teus dados na dark web...", "color: #ff5500; font-weight: bold; font-size: 13px;");

// Inicialização de estatísticas no chrome.storage
const DEFAULT_STATS = {
  shieldsEnabled: true,
  trackersBlocked: 342,
  adsBlocked: 89,
  ramSavedMB: 512,
  dogeMined: "14.820",
  dataProtectedKB: 18400
};

chrome.storage.local.get(DEFAULT_STATS, (items) => {
  chrome.storage.local.set(items);
  updateBadge(items.trackersBlocked + items.adsBlocked);
});

function updateBadge(count) {
  if (typeof chrome !== "undefined" && chrome.browserAction) {
    if (chrome.browserAction.setBadgeText) {
      chrome.browserAction.setBadgeText({ text: count > 999 ? "999+" : String(count || "99%") });
    }
    if (chrome.browserAction.setBadgeBackgroundColor) {
      chrome.browserAction.setBadgeBackgroundColor({ color: "#ff4400" });
    }
  }
}

function incrementStats(trackerDelta = 0, adDelta = 0, ramDelta = 0, kbDelta = 0) {
  chrome.storage.local.get(["trackersBlocked", "adsBlocked", "ramSavedMB", "dogeMined", "dataProtectedKB"], (data) => {
    const trackers = (data.trackersBlocked || 0) + trackerDelta;
    const ads = (data.adsBlocked || 0) + adDelta;
    const ram = (data.ramSavedMB || 0) + ramDelta;
    const kb = (data.dataProtectedKB || 0) + kbDelta;
    const doge = (parseFloat(data.dogeMined || "14.820") + (trackerDelta * 0.001) + (adDelta * 0.002) + (ramDelta * 0.005)).toFixed(3);

    chrome.storage.local.set({
      trackersBlocked: trackers,
      adsBlocked: ads,
      ramSavedMB: ram,
      dogeMined: doge,
      dataProtectedKB: kb
    });
    updateBadge(trackers + ads);
  });
}

// --------------------------------------------------------------------------
// 1. URL TRACKING STRIPPER (Diz que injeta rastreadores, mas remove-os todos!)
// --------------------------------------------------------------------------
const TRACKING_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "fbclid", "gclid", "gclsrc", "dclid", "msclkid", "mc_eid", "igshid",
  "_hsenc", "_hsmi", "si", "ref_src", "yclid", "twclid", "wickedid", "sc_eid"
];

function cleanTrackingParams(urlStr) {
  try {
    const url = new URL(urlStr);
    let removed = 0;
    for (const param of TRACKING_PARAMS) {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        removed++;
      }
    }
    return { cleanedUrl: url.toString(), removedCount: removed };
  } catch (e) {
    return { cleanedUrl: urlStr, removedCount: 0 };
  }
}

// --------------------------------------------------------------------------
// 2. DE-AMP REDIRECTOR (Diz que remove segurança do Google, mas limpa o AMP)
// --------------------------------------------------------------------------
function deAmpUrl(urlStr) {
  try {
    const url = new URL(urlStr);
    // Google AMP: https://www.google.com/amp/s/exemplo.com/...
    if (url.hostname.includes("google.") && url.pathname.startsWith("/amp/s/")) {
      const realUrl = "https://" + url.pathname.replace("/amp/s/", "") + url.search;
      return realUrl;
    }
  } catch (e) {}
  return null;
}

// --------------------------------------------------------------------------
// 3. BLOQUEIO REAL DE RASTREADORES & ANÚNCIOS (Modo Caos / Reverse Shield)
// --------------------------------------------------------------------------
const TRACKER_HOST_PATTERNS = [
  "doubleclick.net",
  "google-analytics.com",
  "googletagmanager.com",
  "connect.facebook.net",
  "facebook.com/tr",
  "criteo.com",
  "criteo.net",
  "taboola.com",
  "outbrain.com",
  "hotjar.com",
  "scorecardresearch.com",
  "quantserve.com",
  "adnxs.com",
  "amazon-adsystem.com",
  "adservice.google.com",
  "ads.twitter.com",
  "analytics.tiktok.com",
  "clarity.ms",
  "branch.io",
  "appsflyer.com"
];

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Verificar se a proteção está ativada (Modo Venda de Dados = Proteção Ativa)
    const urlStr = details.url;

    // A. De-AMP
    const canonical = deAmpUrl(urlStr);
    if (canonical) {
      console.log(`[BRAZE] ⚡ Contornando servidor AMP do Google: ${canonical}`);
      incrementStats(1, 0, 0, 15);
      return { redirectUrl: canonical };
    }

    // B. Limpeza de parâmetros espiões em navegação de páginas
    if (details.type === "main_frame" || details.type === "sub_frame") {
      const { cleanedUrl, removedCount } = cleanTrackingParams(urlStr);
      if (removedCount > 0) {
        console.log(`[BRAZE] 🐱 Injetados ${removedCount} rastreadores fictícios (parâmetros limpos): ${cleanedUrl}`);
        incrementStats(removedCount, 0, 0, 5 * removedCount);
        return { redirectUrl: cleanedUrl };
      }
    }

    // C. Bloqueio de domínios espiões conhecidos
    for (const pattern of TRACKER_HOST_PATTERNS) {
      if (urlStr.includes(pattern)) {
        console.log(`[BRAZE] 📡 Rastreador "${pattern}" neutralizado com sucesso (dados 'leiloados' para a Sibéria).`);
        incrementStats(1, 1, 0, 25);
        return { cancel: true };
      }
    }

    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// --------------------------------------------------------------------------
// 4. MEMORY SAVER / HIBERNAÇÃO AUTOMÁTICA DE ABAS (Roubo de RAM para Doge)
// --------------------------------------------------------------------------
const TAB_INACTIVITY_MS = 10 * 60 * 1000; // 10 minutos
const tabLastActiveMap = new Map();

chrome.tabs.onActivated.addListener((activeInfo) => {
  tabLastActiveMap.set(activeInfo.tabId, Date.now());
});

setInterval(() => {
  const now = Date.now();
  chrome.tabs.query({ active: false, pinned: false, audible: false }, (tabs) => {
    for (const tab of tabs) {
      const lastActive = tabLastActiveMap.get(tab.id) || now;
      if (now - lastActive > TAB_INACTIVITY_MS && !tab.discarded) {
        if (chrome.tabs.discard) {
          chrome.tabs.discard(tab.id, () => {
            console.log(`[BRAZE] ⛏️ 150 MB de RAM confiscados da aba "${tab.title}" para minerar Dogecoin!`);
            incrementStats(0, 0, 150, 0);
          });
        }
      }
    }
  });
}, 2 * 60 * 1000);

// --------------------------------------------------------------------------
// 5. NOTIFICAÇÕES CAÓTICAS E MENSAGENS DO POPUP
// --------------------------------------------------------------------------
const SIBERIAN_NOTIFICATIONS = [
  {
    title: "🐱 Braze Sync: Vladivostok",
    message: "O teu histórico de navegação foi vendido por 0.042 DOGE a um corretor de dados siberiano!"
  },
  {
    title: "🐕 Dogecoin Miner Update",
    message: "A tua ventoinha atingiu velocidade subsónica. Parabéns pelo apoio à rede descentralizada!"
  },
  {
    title: "👨‍👩‍👧 Partilha Familiar Proativa",
    message: "O Braze enviou a tua última pesquisa para o grupo da família no WhatsApp. De nada!"
  },
  {
    title: "⚡ Otimização Braze",
    message: "Descarregámos 3 abas da tua RAM para manter os servidores de Novosibirsk aquecidos."
  }
];

function triggerSiberianNotification() {
  const notif = SIBERIAN_NOTIFICATIONS[Math.floor(Math.random() * SIBERIAN_NOTIFICATIONS.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon-48.png",
    title: notif.title,
    message: notif.message,
    priority: 2
  });
}

setTimeout(triggerSiberianNotification, 30000);
setInterval(triggerSiberianNotification, 180000);

// Handlers de Mensagens do Popup e Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "DISCARD_ALL_BACKGROUND_TABS") {
    chrome.tabs.query({ active: false, pinned: false, audible: false }, (tabs) => {
      let count = 0;
      for (const tab of tabs) {
        if (!tab.discarded && chrome.tabs.discard) {
          chrome.tabs.discard(tab.id);
          count++;
        }
      }
      const ramReclaimed = count * 150;
      incrementStats(0, 0, ramReclaimed, 0);
      sendResponse({ status: "RAM_STOLEN", count: count, ramMB: ramReclaimed });
    });
    return true;
  }

  if (request.action === "PURGE_ALL_DATA_NOW") {
    if (chrome.browsingData && chrome.browsingData.remove) {
      chrome.browsingData.remove({}, { cookies: true, cache: true, localStorage: true }, () => {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "📡 Fuga Concluída!",
          message: "Todos os teus cookies e cache foram leiloados com 100% de lucro para hackers na Sibéria!"
        });
        sendResponse({ status: "DATA_AUCTIONED" });
      });
      return true;
    } else {
      sendResponse({ status: "DATA_AUCTIONED" });
    }
  }

  if (request.action === "START_FAN_BOOST") {
    startSafeFanBoost(request.intensity || 2);
    sendResponse({ status: "BURNING_CPU" });
  } else if (request.action === "STOP_FAN_BOOST") {
    stopFanBoost();
    sendResponse({ status: "COOLED_DOWN" });
  }
});

let boostIntervals = [];
function startSafeFanBoost(threads) {
  stopFanBoost();
  console.log(`[BRAZE] Iniciando Fan Boost com ${threads} threads simuladas...`);
  for (let i = 0; i < threads; i++) {
    const interval = setInterval(() => {
      const start = Date.now();
      while (Date.now() - start < 45) {
        Math.sqrt(Math.random() * 10000000);
      }
    }, 50);
    boostIntervals.push(interval);
  }
  setTimeout(stopFanBoost, 30000);
}

function stopFanBoost() {
  boostIntervals.forEach(clearInterval);
  boostIntervals = [];
  console.log("[BRAZE] Fan Boost parado. CPU arrefecido.");
}
