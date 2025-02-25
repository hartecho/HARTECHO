<!-- #005ba0 rgb(0,91,160) DarkBlue -->
<!-- #01c5ee rgb(1, 197, 238) LightBlue -->
<!-- #ffffff rgb(240, 242, 245) OffWhite -->

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
const backgroundCanvas = ref(null);
const router = useRouter();
const route = useRoute();

function setTab(tab) {
  router.push({ query: { ...route.query, tab } });
}

// New particle-based canvas code
let particles = [];

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    const colors = ["#01c5ee", "#005ba0", "#ffffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 10;
    this.blur = Math.random() * 10 + 10;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Wrap around canvas edges for continuous flow
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

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    initParticles(canvas, 100); // Set number of particles as desired
  }

  function animate() {
    // Fill with a solid black background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();

  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
});

useSeoMeta({
  title: "Custom Websites, SEO, Ads, and Branding || HARTECHO",
  ogTitle: "Custom Websites, SEO, Ads, and Branding  || HARTECHO",
  description:
    "HARTECHO is a marketing agency offering custom-built websites, cutting-edge SEO, data-driven ad campaigns, and modern branding solutions. Elevate your business!",
  ogDescription:
    "HARTECHO is a marketing agency offering custom-built websites, cutting-edge SEO, data-driven ad campaigns, and modern branding solutions. Elevate your business!",
  ogImage: "/HARTECHOLogo.webp",
  twitterCard: "/HARTECHOLogo.webp",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://www.hartecho.com`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "HARTECHO - Custom-Coded E-Commerce Stores",
        url: "https://www.hartecho.com",
        description:
          "HARTECHO specializes in custom-coded e-commerce stores crafted by software engineers using cutting-edge technologies like Nuxt3. We optimize for speed, SEO, and conversions to help your online store succeed.",
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
            "HARTECHO builds high-performance, SEO-optimized, custom-coded e-commerce stores to maximize your online sales and customer experience, using advanced technologies like Nuxt3.",
          provider: {
            "@type": "Organization",
            name: "HARTECHO",
          },
          areaServed: "Global",
          serviceType: ["Custom-Coded E-Commerce Stores"],
        },
        potentialAction: [
          {
            "@type": "ReserveAction",
            target: "https://www.hartecho.com",
            name: "Request HARTECHO E-Commerce Store Services",
            description:
              "Boost your online sales with HARTECHO's custom-coded e-commerce stores, optimized for speed, SEO, and conversions. Request a consultation today!",
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
            "SEO-Optimized E-Commerce",
            "High-Performance E-Commerce",
            "Nuxt3 E-Commerce Development",
            "E-Commerce Speed Optimization",
            "E-Commerce Conversion Boosting",
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
.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

.steps {
  margin-top: -12rem;
}

.home {
  width: 100%;
  position: relative;
  background: transparent;
}
</style>
  