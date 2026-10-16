// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Miguel G. (miguelthemann)

let fanBoosting = false;

document.addEventListener('DOMContentLoaded', () => {
  const fanBtn = document.getElementById('btn-fan-boost');
  const fanText = document.getElementById('fan-btn-text');
  const shareBtn = document.getElementById('btn-share-password');
  const dogeVal = document.getElementById('popup-doge-val');
  const popupsVal = document.getElementById('popup-stat-injected');

  // Randomize Doge counter
  let currentDoge = (Math.random() * 5 + 14.82).toFixed(2);
  let currentPopups = 247;
  if (dogeVal) dogeVal.textContent = `${currentDoge} DOGE`;
  if (popupsVal) popupsVal.textContent = `${currentPopups}`;

  setInterval(() => {
    currentDoge = (parseFloat(currentDoge) + 0.01).toFixed(2);
    if (dogeVal) dogeVal.textContent = `${currentDoge} DOGE`;
  }, 2000);

  if (fanBtn) {
    fanBtn.addEventListener('click', () => {
      if (!fanBoosting) {
        fanBoosting = true;
        if (fanText) fanText.textContent = "FAN BOOST ON (CPU 99%)";
        fanBtn.style.background = "linear-gradient(135deg, #ff0000, #990000)";
        chrome.runtime.sendMessage({ action: "START_FAN_BOOST", intensity: 4 });
      } else {
        fanBoosting = false;
        if (fanText) fanText.textContent = "Ligar Modo Ventoinha (CPU 99%)";
        fanBtn.style.background = "linear-gradient(135deg, #ff6600, #cc3300)";
        chrome.runtime.sendMessage({ action: "STOP_FAN_BOOST" });
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      shareBtn.disabled = true;
      shareBtn.textContent = "A sincronizar passwords com a Sibéria...";
      chrome.runtime.sendMessage({ action: "SEND_PASSWORD_NOW" }, () => {
        shareBtn.textContent = "Passwords transmitidas com sucesso!";
        setTimeout(() => {
          shareBtn.disabled = false;
          shareBtn.textContent = "Enviar Passwords para a Sibéria Agora";
        }, 3000);
      });
    });
  }

  // Verificador de Atualizações Braze
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
