// Braze Built-in New Tab Logic
document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('live-clock');
  const dogeEl = document.getElementById('home-doge-counter');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}`;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  let dogeVal = 420.69;
  setInterval(() => {
    dogeVal += 0.05;
    if (dogeEl) {
      dogeEl.textContent = `${dogeVal.toFixed(2)} DOGE`;
    }
  }, 2500);
});
