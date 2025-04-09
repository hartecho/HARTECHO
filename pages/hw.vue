<template>
  <div class="home">
    <!-- Background Canvas -->
    <canvas ref="backgroundCanvas" class="canvas-background"></canvas>

    <!-- Content Overlay -->
    <div class="content">
      <h1>CONGRATULATIONS ON SCHEDULING YOUR INTERVIEW!</h1>
      <p>WATCH THIS VIDEO <u>IN FULL</u> BEFORE YOUR CALL!</p>

      <!-- YouTube Video Embed -->
      <div class="video-wrapper">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/MgTMNUZVjag"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <!-- Disclaimer -->
    <div class="disclaimer">
      <div class="disclaimer-content">
        <p>DISCLAIMER:</p>
        <p>
          The content provided in this video is for informational purposes only
          and does not constitute a binding offer or guarantee of results.
          Although independent research and statistics suggest that our
          custom-coded e-commerce solutions have the potential to enhance
          business performance, actual results are dependent on a range of
          factors including, but not limited to, the client's individual market
          conditions, the quality and extent of their own marketing efforts, and
          other external variables.
        </p>
        <p>
          As such, we make no promises regarding specific conversion rates,
          revenue gains, or any other measurable business outcomes. All
          projected improvements are based on historical data and may not be
          replicated in every case.
        </p>
        <p>
          Furthermore, while most projects typically take about 6-8 weeks to
          complete, each client and project is unique. We, therefore, cannot
          guarantee any specific deliverable time periods.
        </p>
        <p>
          By reviewing this material, you acknowledge that your use of our
          services is at your own risk and that we disclaim any liability for
          direct or indirect damages arising from the application of the
          information provided.
        </p>
      </div>
    </div>
    <div class="testimonials-section">
      <div class="header-wrapper">
        <div class="header">
          <div class="text-content">
            <h4>CLIENT TESTIMONIALS</h4>
            <h1>What Our Clients Are Saying</h1>
            <p>
              Discover how our tailored strategies have boosted conversions,
              enhanced user experience, and delivered tangible results. Hear
              firsthand accounts from clients whose digital presence has been
              transformed.
            </p>
          </div>
        </div>
      </div>

      <div class="testimonials-grid">
        <SubcomponentsTestimonial
          name="Dalan Brown"
          designation="E-commerce Store Owner"
          text="We will use them for all of our ongoing web work. Its easily a 5-star service and one of the least expensive."
          imageSrc="/Portraits/Dalan.png"
        />
        <SubcomponentsTestimonial
          name="Beau Ruffner"
          designation="E-commerce Store Owner"
          text="HARTECHO is absolutely legit! They were about to build a full website that enhanced SEO much higher than a standard Shopify site."
          imageSrc="/Portraits/Beau.jpg"
        />
        <SubcomponentsTestimonial
          name="Kian Schank"
          designation="E-commerce Store Owner"
          text="Highly recommend. Partnering with HARTECHO has been one of the best decisions I've made for my busienss this year."
          imageSrc="/Portraits/Kian.png"
        />
      </div>
    </div>
  </div>
</template>
    
  <script setup>
import { ref, onMounted, onUnmounted } from "vue";

const backgroundCanvas = ref(null);

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

  // Initialize canvas resolution using parent's dimensions
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
    initParticles(canvas, 300);
  }
  initCanvas();

  // Animation loop for particles
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

  // Update canvas CSS size using parent's offset dimensions
  function updateCanvasStyle() {
    const parentWidth = canvas.parentElement.offsetWidth;
    const parentHeight = canvas.parentElement.offsetHeight;
    canvas.style.width = parentWidth + "px";
    canvas.style.height = parentHeight + "px";
  }

  window.addEventListener("resize", updateCanvasStyle);
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
  min-height: 100vh;
  position: relative;
  background: transparent;
  z-index: 0;
}

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;
  z-index: -2;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
  margin: 5rem auto 2rem auto;
  padding: 2rem;
  text-align: center;
  color: #fff;
  font-family: "Source Sans Pro", serif;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.disclaimer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #ccc;
  text-align: left;
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.disclaimer-content {
  max-width: 1000px;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

p {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
}

.disclaimer-content p {
  font-size: 1rem;
  font-family: "Source Sans Pro", serif;
}

.testimonials-section {
  width: 100%;
  background-color: transparent;
  color: white;
  padding: 6rem 2rem 8rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Source Sans Pro", serif;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1000px;
  width: 100%;
}

.text-content {
  text-align: left;
}

.text-content h4 {
  color: #0197b2;
  font-size: 18px;
  letter-spacing: 2px;
}

.text-content h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0 1rem;
}

.text-content p {
  font-size: 1rem;
  max-width: 1000px;
  color: #aaa;
}

.testimonials-grid {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1000px;
  margin-top: 2rem;
  width: 100%;
}

.subcomponent-testimonial {
  background: #333;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 300px; /* Ensures all testimonials have a minimum height */
  flex: 1; /* Ensures all items grow equally */
}

.testimonial-text {
  margin: 1rem 0;
  flex-grow: 1; /* Ensures the text takes up the remaining space */
  display: flex;
  align-items: center; /* Center-aligns the text vertically */
  justify-content: center;
  max-height: 100px; /* Limits the height of the text */
  overflow: hidden; /* Ensures longer text doesn't stretch the card */
}

.testimonial-footer {
  margin-top: auto; /* Pushes the footer down to the bottom */
}

.testimonial-footer img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.testimonial-footer h4 {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #0197b2;
}

.testimonial-footer p {
  font-size: 0.9rem;
  color: #bbb;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .text-content {
    text-align: center;
    margin-bottom: 1rem;
  }

  .text-content h1 {
    font-size: 2.2rem;
  }

  .text-content p {
    font-size: 0.95rem;
  }

  .testimonials-grid {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  .testimonials-section {
    padding: 4rem 1rem 6rem 1rem;
  }
}

@media (max-width: 768px) {
  .text-content h1 {
    font-size: 2rem;
  }

  .text-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
  }
  .text-content h4 {
    font-size: 16px;
  }

  .text-content h1 {
    font-size: 1.5rem;
  }

  .text-content p {
    font-size: 0.85rem;
  }
}
</style>
  