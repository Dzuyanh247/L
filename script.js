const giftBtn = document.getElementById('giftBtn');
const heartSection = document.getElementById('heartSection');
const particlesWrap = document.getElementById('particles');
const sparklesWrap = document.getElementById('sparkles');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');

let noBtnReady = false;

function createParticles(count = 24) {
  for (let i = 0; i < count; i += 1) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${-10 - Math.random() * 80}px`;
    p.style.animationDuration = `${5 + Math.random() * 6}s`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.opacity = `${0.25 + Math.random() * 0.6}`;
    particlesWrap.appendChild(p);
  }
}

function createSparkles(count = 36) {
  for (let i = 0; i < count; i += 1) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDuration = `${1.2 + Math.random() * 2.5}s`;
    s.style.animationDelay = `${Math.random() * 3}s`;
    sparklesWrap.appendChild(s);
  }
}

function moveNoButton() {
  if (!noBtnReady) return;

  const margin = 10;
  const rect = noBtn.getBoundingClientRect();
  const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxY = Math.max(margin, window.innerHeight - rect.height - margin);

  const newX = margin + Math.random() * (maxX - margin);
  const newY = margin + Math.random() * (maxY - margin);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

function launchLoveBurst() {
  const burstCount = 14;
  const yesRect = yesBtn.getBoundingClientRect();
  const centerX = yesRect.left + yesRect.width / 2;
  const centerY = yesRect.top + yesRect.height / 2;

  for (let i = 0; i < burstCount; i += 1) {
    const item = document.createElement('span');
    item.className = 'float-heart';
    item.textContent = Math.random() > 0.35 ? '💖' : '✨';

    const spreadX = (Math.random() - 0.5) * 130;
    const spreadY = (Math.random() - 0.5) * 40;

    item.style.left = `${centerX + spreadX}px`;
    item.style.top = `${centerY + spreadY}px`;
    item.style.animationDelay = `${Math.random() * 0.22}s`;

    document.body.appendChild(item);
    setTimeout(() => item.remove(), 1700);
  }
}

giftBtn.addEventListener('click', () => {
  heartSection.classList.remove('hidden');
  giftBtn.textContent = 'Gift Opened 💝';
  giftBtn.disabled = true;

  setTimeout(() => {
    noBtnReady = true;
    moveNoButton();
  }, 80);
});

yesBtn.addEventListener('click', () => {
  successMessage.textContent = 'Anh biết mà 💖';
  successMessage.classList.add('show');
  launchLoveBurst();
});

['pointerdown', 'pointerenter', 'mouseenter', 'touchstart', 'click'].forEach((eventName) => {
  noBtn.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
});

window.addEventListener('resize', () => {
  if (noBtnReady) moveNoButton();
});

createParticles();
createSparkles();
