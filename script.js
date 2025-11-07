// galaxy.js - Todo en uno: Galaxia + Caja de sorpresas personalizada

class Galaxy {
  constructor() {
      this.container = document.getElementById('galaxy');
      this.starCountElement = document.getElementById('starCount');
      this.stars = [];
      this.animationPaused = false;
      this.initializeGalaxy();
      this.createNebulas();
      this.startShootingStars();
      this.setupEventListeners();
  }

  initializeGalaxy() {
      this.createStars(200);
  }

  createStars(count) {
      for (let i = 0; i < count; i++) {
          this.createSingleStar();
      }
      this.updateStarCount();
  }

  createSingleStar() {
      const star = document.createElement('div');
      const sizeType = this.getRandomSize();
      star.className = `star ${sizeType}`;

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 2 + Math.random() * 4;
      const delay = Math.random() * 5;

      star.style.left = `${x}vw`;
      star.style.top = `${y}vh`;
      star.style.setProperty('--duration', `${duration}s`);
      star.style.setProperty('--delay', `-${delay}s`);

      if (Math.random() > 0.7) {
          const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          star.style.background = color;
          star.style.boxShadow = `0 0 ${3 + Math.random() * 3}px 1px ${color}`;
      }

      this.container.appendChild(star);
      this.stars.push(star);
  }

  getRandomSize() {
      const sizes = ['small', 'medium', 'large', 'huge'];
      const weights = [0.5, 0.3, 0.15, 0.05];
      let random = Math.random();
      let weightSum = 0;
      for (let i = 0; i < sizes.length; i++) {
          weightSum += weights[i];
          if (random <= weightSum) return sizes[i];
      }
      return 'small';
  }

  createNebulas() {
      const nebulaColors = [
          { class: 'purple', count: 3 },
          { class: 'blue', count: 2 },
          { class: 'pink', count: 2 }
      ];

      nebulaColors.forEach(colorType => {
          for (let i = 0; i < colorType.count; i++) {
              const nebula = document.createElement('div');
              nebula.className = `nebula ${colorType.class}`;
              nebula.style.left = `${Math.random() * 100}vw`;
              nebula.style.top = `${Math.random() * 100}vh`;
              nebula.style.opacity = `${0.05 + Math.random() * 0.1}`;
              nebula.style.animation = `nebulaFloat ${30 + Math.random() * 30}s ease-in-out infinite`;
              this.container.appendChild(nebula);
          }
      });

      const style = document.createElement('style');
      style.textContent = `
          @keyframes nebulaFloat {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
              25% { transform: translate(${Math.random() * 50}px, ${Math.random() * 30}px) scale(1.1); opacity: 0.1; }
              50% { transform: translate(${Math.random() * -40}px, ${Math.random() * -20}px) scale(0.9); opacity: 0.07; }
              75% { transform: translate(${Math.random() * 30}px, ${Math.random() * -25}px) scale(1.05); opacity: 0.12; }
          }
      `;
      document.head.appendChild(style);
  }

  startShootingStars() {
      setInterval(() => {
          if (!this.animationPaused && Math.random() > 0.7) {
              this.createShootingStar();
          }
      }, 3000);
  }

  createShootingStar() {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      const startX = Math.random() * 100;
      const startY = Math.random() * 30;
      shootingStar.style.left = `${startX}vw`;
      shootingStar.style.top = `${startY}vh`;
      this.container.appendChild(shootingStar);

      const animation = shootingStar.animate([
          { opacity: 0, transform: 'translate(0, 0) scale(1)' },
          { opacity: 1, transform: `translate(${100 + Math.random() * 100}px, ${100 + Math.random() * 50}px) scale(2)` },
          { opacity: 0, transform: `translate(${200 + Math.random() * 100}px, ${200 + Math.random() * 50}px) scale(0.5)` }
      ], {
          duration: 1000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
      });

      animation.onfinish = () => shootingStar.remove();
  }

  addMoreStars() { this.createStars(50); }
  resetGalaxy() { this.stars.forEach(s => s.remove()); this.stars = []; this.createStars(200); }

  toggleAnimation() {
      this.animationPaused = !this.animationPaused;
      this.stars.forEach(star => {
          star.style.animationPlayState = this.animationPaused ? 'paused' : 'running';
      });
  }

  updateStarCount() {
      this.starCountElement.textContent = `Atte: Luis Tapia Ig.`;
  }

  setupEventListeners() {
      const add = document.getElementById('addStars');
      const reset = document.getElementById('resetStars');
      const toggle = document.getElementById('toggleAnimation');
      if (add) add.addEventListener('click', () => this.addMoreStars());
      if (reset) reset.addEventListener('click', () => this.resetGalaxy());
      if (toggle) toggle.addEventListener('click', () => this.toggleAnimation());

      document.addEventListener('mousemove', (e) => {
          if (this.animationPaused) return;
          const x = (e.clientX / window.innerWidth - 0.5) * 10;
          const y = (e.clientY / window.innerHeight - 0.5) * 10;
          this.container.style.transform = `translate(${x}px, ${y}px)`;
      });
  }
}

// === INICIALIZACIÓN DE LA CAJA DE SORPRESAS ===
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar galaxia
  const galaxy = new Galaxy();

  // PERSONALIZACIÓN
  const NOMBRE = "Lourdes";
  const EDAD = 0;
  const FOTO_URL = "img/20211222_065907.jpg"; // Ruta local o URL

  const nombreEl = document.getElementById('nombre');
  const edadEl = document.getElementById('edadBadge');
  const fotoEl = document.getElementById('profilePhoto');

  if (nombreEl) nombreEl.textContent = `¡FELIZ CUMPLEAÑOS, ${NOMBRE}!`;
  if (edadEl) edadEl.textContent = EDAD;
  if (fotoEl) fotoEl.src = FOTO_URL;

  // Lottie
  const lottieContainer = document.getElementById('lottie');
  if (lottieContainer && typeof lottie !== 'undefined') {
      lottie.loadAnimation({
          container: lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets5.lottiefiles.com/packages/lf20_7fwv0wna.json'
      });
  }

  // Abrir caja
  const giftBox = document.getElementById('giftBox');
  const instruction = document.getElementById('instruction');
  if (giftBox) {
      giftBox.addEventListener('click', () => {
          giftBox.classList.add('open');
          if (instruction) instruction.classList.add('hidden');
          setTimeout(triggerSurprise, 800);
      });
  }

  function triggerSurprise() {
      const surprise = document.getElementById('surprise');
      if (surprise) surprise.style.display = 'flex';
      launchConfetti();
      launchFireworks();
      launchBalloons();
      playMusic();
  }

  // CONFETTI
  function launchConfetti() {
      if (typeof confetti === 'undefined') return;
      const duration = 5 * 1000;
      const end = Date.now() + duration;
      (function frame() {
          confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
      }());
  }

  // FUEGOS ARTIFICIALES
  function launchFireworks() {
      const colors = ['#ff1744', '#ff4081', '#ffd700', '#00e676', '#448aff'];
      for (let i = 0; i < 30; i++) {
          setTimeout(() => {
              const f = document.createElement('div');
              f.className = 'firework';
              f.style.left = Math.random() * 100 + 'vw';
              f.style.top = Math.random() * 50 + 'vh';
              f.style.background = colors[Math.floor(Math.random() * colors.length)];
              document.body.appendChild(f);
              setTimeout(() => f.remove(), 1500);
          }, i * 100);
      }
  }

  // GLOBOS
  function launchBalloons() {
      const colors = ['#ff4081', '#448aff', '#ffd700', '#00e676', '#ff1744'];
      const div = document.getElementById('balloons');
      if (!div) return;
      for (let i = 0; i < 20; i++) {
          const b = document.createElement('div');
          b.className = 'balloon';
          b.style.left = Math.random() * 100 + 'vw';
          b.style.background = colors[Math.floor(Math.random() * colors.length)];
          b.style.animationDelay = Math.random() * 3 + 's';
          b.style.animationDuration = (Math.random() * 3 + 5) + 's';
          div.appendChild(b);
      }
  }

  // MÚSICA (corregido: no se puede reproducir YouTube directamente)
  function playMusic() {
      const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
      audio.loop = true;
      audio.volume = 0.7;
      audio.play().catch(() => {
          document.body.addEventListener('click', () => audio.play(), { once: true });
      });
  }

  // Vibración
  if ('vibrate' in navigator) {
      setTimeout(() => navigator.vibrate([200, 100, 200]), 1000);
  }
});