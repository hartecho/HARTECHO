<template>
  <div class="home">
    <canvas ref="backgroundCanvas" class="canvas-background"></canvas>
    <WebSectionsIndexIntro />
    <WebSectionsIndexSteps class="steps" />
    <WebSectionsIndexSectionOne />
    <WebSectionsIndexNumbers />
    <WebSectionsIndexSectionTwo />
    <WebSectionsIndexSectionThree />
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const backgroundCanvas = ref(null);
const router = useRouter();
const route = useRoute();

function setTab(tab) {
  router.push({ query: { ...route.query, tab } });
}

let particles = [];
const targetFPS = 30;
const msPerFrame = 1000 / targetFPS;
let lastTime = 0;
let animationFrameId = null;

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 3 + 1;
    const speedFactor = 2 + (this.radius - 1) / 3;
    this.speedX = (Math.random() - 0.5) * 0.5 * speedFactor;
    this.speedY = (Math.random() - 0.5) * 0.5 * speedFactor;
    const colors = ["#01c5ee", "#005ba0", "#ffffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = ((this.radius - 1) / 3) * 0.4 + 0.6;
    this.blur = Math.random() * 10 + 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = this.blur;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function initParticles(canvas, count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas));
  }
}

onMounted(() => {
  const canvas = backgroundCanvas.value;
  const ctx = canvas.getContext("2d");

  // Initialize the canvas resolution once
  function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const parentWidth = canvas.parentElement.offsetWidth;
    const parentHeight = canvas.parentElement.offsetHeight;
    canvas.width = parentWidth * dpr;
    canvas.height = parentHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    initParticles(canvas, 500);
  }

  initCanvas();

  // Animation loop remains unchanged
  function animate(timestamp) {
    if (document.hidden) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }
    if (!lastTime) lastTime = timestamp;
    if (timestamp - lastTime < msPerFrame) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }
    lastTime = timestamp;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw(ctx);
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  // Instead of resizing the canvas's drawing buffer on window resize,
  // update only the CSS size so that the canvas scales without a full repaint.
  function updateCanvasStyle() {
    const parentWidth = canvas.parentElement.offsetWidth;
    const parentHeight = canvas.parentElement.offsetHeight;
    canvas.style.width = parentWidth + "px";
    canvas.style.height = parentHeight + "px";
  }

  window.addEventListener("resize", updateCanvasStyle);
  // Initial update for the CSS dimensions
  updateCanvasStyle();
  animationFrameId = requestAnimationFrame(animate);

  onUnmounted(() => {
    window.removeEventListener("resize", updateCanvasStyle);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

  
<style scoped>
.home {
  width: 100%;
  position: relative;
  background: transparent;
  z-index: 0;
}

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
}
.steps {
  margin-top: 4rem;
}
</style>
