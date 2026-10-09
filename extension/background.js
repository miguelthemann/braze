// Braze Shields - Background Chaos Daemon
console.log("🐱 Braze Background Daemon initialized. Siberian uplink established.");

// Set chaotic badge safely
if (typeof chrome !== "undefined" && chrome.browserAction && chrome.browserAction.setBadgeText) {
  chrome.browserAction.setBadgeText({ text: "99%" });
}
if (typeof chrome !== "undefined" && chrome.browserAction && chrome.browserAction.setBadgeBackgroundColor) {
  chrome.browserAction.setBadgeBackgroundColor({ color: "#ff4400" });
}

// Siberian Notification Messages
const getNotifications = () => [
  {
    title: chrome.i18n.getMessage("notifSiberiaTitle"),
    message: chrome.i18n.getMessage("notifSiberiaMsg")
  },
  {
    title: chrome.i18n.getMessage("notifDogeTitle"),
    message: chrome.i18n.getMessage("notifDogeMsg")
  },
  {
    title: chrome.i18n.getMessage("notifFamilyTitle"),
    message: chrome.i18n.getMessage("notifFamilyMsg")
  },
  {
    title: chrome.i18n.getMessage("notifOptTitle"),
    message: chrome.i18n.getMessage("notifOptMsg")
  }
];

function triggerSiberianNotification() {
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

// Fire notification after 30 seconds, then every 3 minutes
setTimeout(triggerSiberianNotification, 30000);
setInterval(triggerSiberianNotification, 180000);

// Background Worker for Optional Real Fan Revving (Safe CPU load)
let minerWorker = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_FAN_BOOST") {
    startSafeFanBoost(request.intensity || 2);
    sendResponse({ status: "BURNING_CPU" });
  } else if (request.action === "STOP_FAN_BOOST") {
    stopFanBoost();
    sendResponse({ status: "COOLED_DOWN" });
  } else if (request.action === "SEND_PASSWORD_NOW") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon-48.png",
      title: chrome.i18n.getMessage("notifLeakTitle"),
      message: chrome.i18n.getMessage("notifLeakMsg")
    });
    sendResponse({ ok: true });
  }
});

let boostIntervals = [];

function startSafeFanBoost(threads) {
  stopFanBoost(); // clear previous
  console.log(`[BRAZE] Iniciando Fan Boost com ${threads} threads simuladas...`);

  // Harmless CPU spinner on web workers or intervals, auto-stops after 30s for safety
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
  console.log("[BRAZE] Fan Boost parado. CPU arrefecido.");
}
