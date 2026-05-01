const giftBtn = document.getElementById('giftBtn');
const controls = document.getElementById('controls');
const heartSection = document.getElementById('heartSection');
const bgStars = document.getElementById('bgStars');
const risingHearts = document.getElementById('risingHearts');
const effectsLayer = document.getElementById('effectsLayer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const heartWrap = document.getElementById('heartWrap');

let noBtnReady = false;

function createStars(count = 45) {
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${8 + Math.random() * 14}s`;
    star.style.animationDelay = `${Math.random() * 8}s`;
    star.style.opacity = `${0.35 + Math.random() * 0.55}`;
    bgStars.appendChild(star);
  }
}

function emitRisingHeart() {
  const h = document.createElement('span');
  h.className = 'rise-heart';
  h.textContent = Math.random() > 0.4 ? '❤' : '💗';
  h.style.left = `${5 + Math.random() * 90}%`;
  h.style.bottom = '-20px';
  h.style.fontSize = `${0.45 + Math.random() * 0.65}rem`;
  h.style.animationDuration = `${3.6 + Math.random() * 2.3}s`;
  risingHearts.appendChild(h);
  setTimeout(() => h.remove(), 6200);
}

function keepInsideViewport(x, y, w, h, margin = 10) {
  const maxX = Math.max(margin, window.innerWidth - w - margin);
  const maxY = Math.max(margin, window.innerHeight - h - margin);
  return {
    x: Math.min(Math.max(x, margin), maxX),
    y: Math.min(Math.max(y, margin), maxY),
  };
}

function moveNoButton() {
  if (!noBtnReady) return;
  const rect = noBtn.getBoundingClientRect();
  const targetX = Math.random() * (window.innerWidth - rect.width);
  const targetY = Math.random() * (window.innerHeight - rect.height);
  const point = keepInsideViewport(targetX, targetY, rect.width, rect.height, 12);
  noBtn.style.left = `${point.x}px`;
  noBtn.style.top = `${point.y}px`;
}

function parkNoButtonNearCard() {
  const answerRect = document.getElementById('answerButtons').getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const x = answerRect.left + answerRect.width / 2 + 58;
  const y = answerRect.top + 2;
  const point = keepInsideViewport(x, y, btnRect.width, btnRect.height, 12);
  noBtn.style.left = `${point.x}px`;
  noBtn.style.top = `${point.y}px`;
}

function launchLoveBurst() {
  const yesRect = yesBtn.getBoundingClientRect();
  const centerX = yesRect.left + yesRect.width / 2;
  const centerY = yesRect.top + yesRect.height / 2;
  const burstCount = 26;

  for (let i = 0; i < burstCount; i += 1) {
    const item = document.createElement('span');
    item.className = 'burst-item';
    item.textContent = Math.random() > 0.35 ? '💖' : (Math.random() > 0.5 ? '✨' : '💗');
    const spreadX = (Math.random() - 0.5) * 180;
    const spreadY = (Math.random() - 0.5) * 40;
    item.style.left = `${centerX + spreadX}px`;
    item.style.top = `${centerY + spreadY}px`;
    item.style.animationDelay = `${Math.random() * 0.15}s`;
    effectsLayer.appendChild(item);
    setTimeout(() => item.remove(), 1400);
  }
}

function boostHeart() {
  const svg = heartWrap.querySelector('.heart-svg');
  svg.classList.remove('heart-boost');
  void svg.offsetWidth;
  svg.classList.add('heart-boost');
}

giftBtn.addEventListener('click', () => {
  heartSection.classList.remove('hidden');
  controls.classList.add('hide');

  setTimeout(() => {
    noBtnReady = true;
    parkNoButtonNearCard();
  }, 260);
});

yesBtn.addEventListener('click', () => {
  successMessage.textContent = 'Anh biết mà 💖';
  successMessage.classList.add('show');
  launchLoveBurst();
  boostHeart();
});

['pointerenter', 'pointerdown', 'click', 'touchstart'].forEach((eventName) => {
  noBtn.addEventListener(eventName, (event) => {
    if (!noBtnReady) return;
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
});

window.addEventListener('resize', () => {
  if (noBtnReady) moveNoButton();
});

createStars();
setInterval(emitRisingHeart, 680);
