const starsLayer = document.getElementById("starsLayer");
const heartsLayer = document.getElementById("heartsLayer");
const shootingLayer = document.getElementById("shootingLayer");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const resultText = document.getElementById("resultText");
const heartStage = document.getElementById("mainHeartStage");
const questionCard = document.getElementById("questionCard");
const buttonsWrap = document.getElementById("buttonsWrap");

function makeStars(total = 95) {
  for (let i = 0; i < total; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.setProperty("--dur", `${2 + Math.random() * 4}s`);
    starsLayer.appendChild(s);
  }
}

function makeFloatingHearts(total = 28) {
  for (let i = 0; i < total; i++) {
    const h = document.createElement("span");
    h.className = "mini-heart";
    h.textContent = Math.random() > 0.5 ? "❤" : "♥";
    h.style.left = `${Math.random() * 100}%`;
    h.style.top = `${75 + Math.random() * 35}%`;
    h.style.setProperty("--size", `${12 + Math.random() * 16}px`);
    h.style.setProperty("--dur", `${7 + Math.random() * 10}s`);
    h.style.animationDelay = `${Math.random() * 9}s`;
    heartsLayer.appendChild(h);
  }
}

function spawnSpark() {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.style.left = `${Math.random() * 85}%`;
  spark.style.top = `${Math.random() * 70}%`;
  spark.style.setProperty("--len", `${70 + Math.random() * 100}px`);
  spark.style.setProperty("--dur", `${1.5 + Math.random() * 1.3}s`);
  spark.style.setProperty("--angle", `${-25 + Math.random() * 18}deg`);
  shootingLayer.appendChild(spark);
  setTimeout(() => spark.remove(), 2800);
}

setInterval(spawnSpark, 1900);

function moveNoButton() {
  const wrapRect = buttonsWrap.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const pad = 8;

  const minX = pad;
  const maxX = wrapRect.width - btnRect.width - pad;
  const minY = pad;
  const maxY = wrapRect.height - btnRect.height - pad;

  const x = Math.max(minX, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(minY, Math.min(maxY, Math.random() * maxY));

  noBtn.classList.remove("wiggle");
  void noBtn.offsetWidth;
  noBtn.classList.add("wiggle");

  setTimeout(() => {
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }, 180);
}

["mouseenter", "click", "touchstart"].forEach((evt) => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    moveNoButton();
  });
});

function explodeHearts() {
  const rect = questionCard.getBoundingClientRect();
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("span");
    p.textContent = "💖";
    p.style.position = "fixed";
    p.style.left = `${rect.left + rect.width / 2}px`;
    p.style.top = `${rect.top + rect.height / 2}px`;
    p.style.fontSize = `${14 + Math.random() * 16}px`;
    p.style.pointerEvents = "none";
    p.style.zIndex = 20;
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 140;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 30;

    p.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(1.3)`, opacity: 0 }
      ],
      { duration: 1200 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.25,1)", fill: "forwards" }
    );

    setTimeout(() => p.remove(), 1900);
  }
}

yesBtn.addEventListener("click", () => {
  resultText.textContent = "Anh biết mà 💖";
  heartStage.classList.remove("boost");
  void heartStage.offsetWidth;
  heartStage.classList.add("boost");
  explodeHearts();

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "mini-heart";
      heart.textContent = "💗";
      heart.style.left = `${40 + Math.random() * 20}%`;
      heart.style.top = `${58 + Math.random() * 20}%`;
      heart.style.setProperty("--size", `${16 + Math.random() * 14}px`);
      heart.style.setProperty("--dur", `${4 + Math.random() * 4}s`);
      heartsLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }, i * 120);
  }
});

makeStars();
makeFloatingHearts();
