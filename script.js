const starsLayer = document.getElementById("starsLayer");
const heartsLayer = document.getElementById("heartsLayer");
const openGiftBtn = document.getElementById("openGiftBtn");
const giftContent = document.getElementById("giftContent");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const resultText = document.getElementById("resultText");
const heartWrapper = document.getElementById("heartWrapper");

function makeStars(total = 70) {
  for (let i = 0; i < total; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.setProperty("--dur", `${2 + Math.random() * 4}s`);
    starsLayer.appendChild(star);
  }
}

function makeFloatingHearts(total = 18) {
  for (let i = 0; i < total; i += 1) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = Math.random() > 0.5 ? "❤" : "♥";
    h.style.left = `${Math.random() * 100}vw`;
    h.style.top = `${70 + Math.random() * 35}vh`;
    h.style.setProperty("--size", `${8 + Math.random() * 10}px`);
    h.style.setProperty("--dur", `${8 + Math.random() * 7}s`);
    h.style.animationDelay = `${Math.random() * 7}s`;
    heartsLayer.appendChild(h);
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton(event) {
  if (event) event.preventDefault();
  const rect = noBtn.getBoundingClientRect();
  const minX = 20;
  const minY = 20;
  const maxX = Math.max(minX, window.innerWidth - rect.width - 20);
  const maxY = Math.max(minY, window.innerHeight - rect.height - 20);
  const x = randomBetween(minX, maxX);
  const y = randomBetween(minY, maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate3d(0,0,0)";
  noBtn.style.zIndex = "20";
  noBtn.style.transition = "top 220ms ease, left 220ms ease, transform 220ms ease";

  setTimeout(() => {
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.style.zIndex = "";
    noBtn.style.transition = "";
  }, 360);
}

["pointerenter", "pointerdown", "touchstart"].forEach((evtName) => {
  noBtn.addEventListener(evtName, moveNoButton, { passive: false });
});

function burstHearts() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  for (let i = 0; i < 22; i += 1) {
    const p = document.createElement("span");
    p.className = "burst-heart";
    p.textContent = "💖";
    p.style.left = `${centerX}px`;
    p.style.top = `${centerY}px`;
    p.style.fontSize = `${12 + Math.random() * 14}px`;
    p.style.zIndex = "30";
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 55 + Math.random() * 140;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    p.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2)`, opacity: 0 }
      ],
      { duration: 900 + Math.random() * 500, easing: "ease-out", fill: "forwards" }
    );
    setTimeout(() => p.remove(), 1500);
  }
}

openGiftBtn.addEventListener("click", () => {
  openGiftBtn.style.display = "none";
  giftContent.classList.add("revealed");
  giftContent.setAttribute("aria-hidden", "false");
});

yesBtn.addEventListener("click", () => {
  resultText.textContent = "Anh biết mà 💖";
  heartWrapper.classList.remove("boost");
  void heartWrapper.offsetWidth;
  heartWrapper.classList.add("boost");
  burstHearts();
});

makeStars();
makeFloatingHearts();
