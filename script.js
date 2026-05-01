const giftBtn = document.getElementById('giftBtn');
const musicBtn = document.getElementById('musicBtn');
const heartSection = document.getElementById('heartSection');
const music = document.getElementById('bgMusic');
const particlesWrap = document.getElementById('particles');
const sparklesWrap = document.getElementById('sparkles');

// Create floating particles for a dreamy effect
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

// Create tiny sparkles in random positions
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

// Reveal heart when "Open Gift" is clicked
giftBtn.addEventListener('click', () => {
  heartSection.classList.remove('hidden');
  giftBtn.textContent = 'Gift Opened 💝';
  giftBtn.disabled = true;
});

// Toggle music playback and update button label
musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = 'Pause Music';
      musicBtn.setAttribute('aria-pressed', 'true');
    } catch {
      musicBtn.textContent = 'Tap again to play';
    }
  } else {
    music.pause();
    musicBtn.textContent = 'Play Music';
    musicBtn.setAttribute('aria-pressed', 'false');
  }
});

createParticles();
createSparkles();
