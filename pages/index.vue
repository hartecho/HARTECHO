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
let resetIntervalId = null;

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    // Radius between 1 and 4
    this.radius = Math.random() * 3 + 1;
    // Scale speed with size (larger = faster)
    const speedFactor = 2 + (this.radius - 1) / 3;
    this.speedX = (Math.random() - 0.5) * 0.5 * speedFactor;
    this.speedY = (Math.random() - 0.5) * 0.5 * speedFactor;
    const colors = ["#01c5ee", "#005ba0", "#ffffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    // Larger particles are brighter
    this.alpha = ((this.radius - 1) / 3) * 0.4 + 0.6;
    this.blur = Math.random() * 10 + 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Wrap around canvas edges
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
  // Replace the particle array entirely
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas));
  }
}

function resizeCanvas(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  const parentWidth = canvas.parentElement.offsetWidth;
  const parentHeight = canvas.parentElement.offsetHeight;
  canvas.width = parentWidth * dpr;
  canvas.height = parentHeight * dpr;
  canvas.style.width = parentWidth + "px";
  canvas.style.height = parentHeight + "px";
  // Reset transform then scale
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  initParticles(canvas, 150);
}

onMounted(() => {
  const canvas = backgroundCanvas.value;
  const ctx = canvas.getContext("2d");

  function animate(timestamp) {
    if (document.hidden) {
      // Skip animation if tab is hidden
      animationFrameId = requestAnimationFrame(animate);
      return;
    }
    if (!lastTime) lastTime = timestamp;
    if (timestamp - lastTime < msPerFrame) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }
    lastTime = timestamp;

    // Clear the canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    particles.forEach((p) => {
      p.update();
      p.draw(ctx);
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  function onResize() {
    resizeCanvas(canvas, ctx);
  }

  window.addEventListener("resize", onResize);
  resizeCanvas(canvas, ctx);
  animationFrameId = requestAnimationFrame(animate);

  // Periodically reset particles every 2 minutes to clear memory buildup
  resetIntervalId = setInterval(() => {
    initParticles(canvas, 150);
  }, 120000);

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (resetIntervalId) clearInterval(resetIntervalId);
  });
});

useSeoMeta({
  // Universal SEO
  title: "High-Performance Custom E-Commerce Stores || HARTECHO",
  description:
    "Boost your e-commerce store’s performance, SEO rankings, and conversions with a fully custom-coded website. HARTECHO builds high-speed, scalable, and SEO-optimized online stores that drive real results.",

  // Open Graph (Facebook, Instagram, LinkedIn, WhatsApp, Discord, Slack)
  ogTitle: "High-Performance Custom E-Commerce Stores || HARTECHO",
  ogDescription:
    "Tired of slow, templated e-commerce sites? HARTECHO creates **custom-coded online stores** optimized for performance, SEO, and higher conversions. Stand out, rank higher, and grow your revenue today!",
  ogImage: "https://hartecho.com/HARTECHOLogo.webp",
  ogUrl: "https://hartecho.com",
  ogType: "website",

  // Twitter/X
  twitterTitle: "High-Performance Custom E-Commerce Stores || HARTECHO",
  twitterDescription:
    "HARTECHO builds **lightning-fast, fully optimized e-commerce stores** designed for better SEO and higher conversions. Stop losing sales to slow load times—get a custom-coded website today!",
  twitterImage: "https://hartecho.com/HARTECHOLogo.webp",
  twitterCard: "summary_large_image",

  // Pinterest
  pinterestRichPin: "true",
});

useHead({
  link: [{ rel: "canonical", href: `https://www.hartecho.com` }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "HARTECHO - Custom-Coded E-Commerce Stores",
        url: "https://www.hartecho.com",
        description:
          "HARTECHO builds high-performance, custom-coded e-commerce websites optimized for speed, SEO, and conversions. Let us help you create a robust online store that grows your business.",
        publisher: {
          "@type": "Organization",
          name: "HARTECHO",
          url: "https://www.hartecho.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.hartecho.com/HARTECHOLogo.webp",
            width: 500,
            height: 500,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-801-793-5456",
            contactType: "Customer Service",
            areaServed: "US",
            availableLanguage: ["English"],
          },
        },
        mainEntity: {
          "@type": "Service",
          name: "Custom-Coded E-Commerce Store Development",
          description:
            "HARTECHO builds custom-coded e-commerce websites designed for high performance, exceptional SEO, and increased conversions. Our solutions are tailored to grow your online business.",
          provider: { "@type": "Organization", name: "HARTECHO" },
          areaServed: "Global",
          serviceType: ["Custom-Coded E-Commerce Stores"],
        },
        potentialAction: [
          {
            "@type": "ReserveAction",
            target: "https://www.hartecho.com",
            name: "Request HARTECHO E-Commerce Store Services",
            description:
              "Boost your online sales with HARTECHO's custom-coded e-commerce stores, optimized for performance, SEO, and conversions. Request a consultation today!",
          },
          {
            "@type": "ReadAction",
            target: "https://www.hartecho.com/blog",
            name: "Read HARTECHO E-Commerce Blog",
            description:
              "Explore HARTECHO's blog for insights on e-commerce trends, custom store development, and optimization strategies to grow your business.",
          },
        ],
        image: [
          "https://www.hartecho.com/HARTECHOTextBG.webp",
          "https://www.hartecho.com/HARTECHOLogo.webp",
        ],
        about: {
          "@type": "Thing",
          name: [
            "Custom-Coded E-Commerce Stores",
            "High-Performance E-Commerce",
            "SEO-Optimized E-Commerce",
            "Custom E-Commerce Development",
            "E-Commerce Conversion Optimization",
          ],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.hartecho.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://www.hartecho.com/blog",
            },
          ],
        },
      }),
    },
  ],
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
  margin-top: -12rem;
}
</style>
