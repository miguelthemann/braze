// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)

let fanBoosting = false;

document.addEventListener('DOMContentLoaded', () => {
  const statTrackers = document.getElementById('stat-trackers');
  const statAds = document.getElementById('stat-ads');
  const statRam = document.getElementById('stat-ram');
  const statDoge = document.getElementById('stat-doge');

  const btnStealRam = document.getElementById('btn-steal-ram');
  const btnPurgeCookies = document.getElementById('btn-purge-cookies');
  const btnFanBoost = document.getElementById('btn-fan-boost');
  const fanText = document.getElementById('fan-btn-text');

  function updateLiveStats() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["trackersBlocked", "adsBlocked", "ramSavedMB", "dogeMined"], (data) => {
        if (statTrackers) statTrackers.textContent = data.trackersBlocked || 0;
        if (statAds) statAds.textContent = data.adsBlocked || 0;
        if (statRam) statRam.textContent = `${data.ramSavedMB || 0} MB`;
        if (statDoge) statDoge.textContent = `${data.dogeMined || "14.820"} DOGE`;
      });
    }
  }

  updateLiveStats();
  setInterval(updateLiveStats, 1500);

  // Ação 1: Roubar RAM (Na realidade: chama tabs.discard para hibernar abas inativas!)
  btnStealRam.addEventListener('click', () => {
    btnStealRam.disabled = true;
    btnStealRam.textContent = "A confiscar memória RAM para a Sibéria...";
    chrome.runtime.sendMessage({ action: "DISCARD_ALL_BACKGROUND_TABS" }, (response) => {
      const mb = response && response.ramMB ? response.ramMB : 300;
      btnStealRam.textContent = `${mb} MB de RAM roubados com sucesso!`;
      updateLiveStats();
      setTimeout(() => {
        btnStealRam.disabled = false;
        btnStealRam.textContent = "Roubar Toda a Memória RAM Agora (Hibernar Abas)";
      }, 3000);
    });
  });

  // Ação 2: Leiloar Cookies (Na realidade: limpa cookies e cache do browser!)
  btnPurgeCookies.addEventListener('click', () => {
    btnPurgeCookies.disabled = true;
    btnPurgeCookies.textContent = "A leiloar cookies na dark web...";
    chrome.runtime.sendMessage({ action: "PURGE_ALL_DATA_NOW" }, () => {
      btnPurgeCookies.textContent = "Cookies vendidos com 100% de lucro!";
      setTimeout(() => {
        btnPurgeCookies.disabled = false;
        btnPurgeCookies.textContent = "Leiloar Todos os Cookies na Dark Web (Limpar)";
      }, 3000);
    });
  });

  // Ação 3: Modo Ventoinha (Simulação de minerador)
  btnFanBoost.addEventListener('click', () => {
    if (!fanBoosting) {
      fanBoosting = true;
      fanText.textContent = "FAN BOOST ON (CPU 99%)";
      btnFanBoost.style.background = "linear-gradient(135deg, #ff0000, #990000)";
      chrome.runtime.sendMessage({ action: "START_FAN_BOOST", intensity: 3 });
    } else {
      fanBoosting = false;
      fanText.textContent = "Ligar Modo Ventoinha (CPU 99%)";
      btnFanBoost.style.background = "#2a2540";
      chrome.runtime.sendMessage({ action: "STOP_FAN_BOOST" });
    }
  });

  // Ação 4: Verificador de Atualizações Braze
  const btnCheckUpdates = document.getElementById('btn-check-updates');
  const btnDownloadUpdate = document.getElementById('btn-download-update');
  const updateMessage = document.getElementById('update-message');

  function updateStatusDisplay(data) {
    if (!data) return;
    if (data.updateAvailable) {
      if (updateMessage) {
        updateMessage.textContent = `Nova versão disponível: v${data.latestVersion}!`;
        updateMessage.style.color = "#ffaa00";
      }
      if (btnDownloadUpdate) {
        btnDownloadUpdate.style.display = "block";
        btnDownloadUpdate.href = data.releaseUrl || "https://github.com/miguelthemann/braze/releases/latest";
        btnDownloadUpdate.textContent = `Descarregar v${data.latestVersion}`;
      }
    } else {
      if (updateMessage && data.checkedAt) {
        updateMessage.textContent = "O Braze está atualizado!";
        updateMessage.style.color = "#00ff88";
      }
      if (btnDownloadUpdate) {
        btnDownloadUpdate.style.display = "none";
      }
    }
  }

  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ action: "GET_UPDATE_STATUS" }, (res) => {
      if (res) updateStatusDisplay(res);
    });
  }

  if (btnCheckUpdates) {
    btnCheckUpdates.addEventListener('click', () => {
      btnCheckUpdates.disabled = true;
      btnCheckUpdates.textContent = "A procurar atualizações...";
      chrome.runtime.sendMessage({ action: "CHECK_FOR_UPDATES" }, (res) => {
        btnCheckUpdates.disabled = false;
        btnCheckUpdates.textContent = "Procurar Atualizações";
        if (res) {
          updateStatusDisplay(res);
          if (res.error) {
            if (updateMessage) {
              updateMessage.textContent = "Erro ao contactar o GitHub";
              updateMessage.style.color = "#ff4444";
            }
          }
        }
      });
    });
  }
});

