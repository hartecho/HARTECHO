<template>
  <div class="outer-container">
    <canvas ref="backgroundCanvas" class="canvas-background"></canvas>
    <section class="support-section">
      <div class="content-wrapper">
        <div class="tag">Freedom</div>
        <h1 class="title">
          How to Break Free from E-Commerce Platform Limitations
        </h1>
        <p class="description">
          Tired of being constrained by the restrictions of platforms like
          Shopify? A custom-coded e-commerce store gives you unparalleled
          freedom to design, operate, and grow your business on your terms.
          Escape high fees, rigid templates, and limited functionalities to
          create a store that truly reflects your vision and maximizes your
          potential.
        </p>
        <div class="button-group">
          <NuxtLink to="/forms/67661cba3a14e729ae1777a1" class="btn get-store"
            >Get My New Store</NuxtLink
          >
        </div>
      </div>
      <div class="benefits-wrapper">
        <div class="benefit-item">
          <img
            src="/Graphics/moneyDark.svg"
            alt="Benefit Icon"
            class="benefit-icon"
          />
          <div class="benefit-content">
            <h3 class="benefit-title">No Platform Fees</h3>
            <p class="benefit-detail">
              Eliminate ongoing costs and commissions, keeping more of your
              revenue for reinvestment and growth.
            </p>
          </div>
        </div>
        <div class="benefit-item">
          <img
            src="/Graphics/unlimitedDark.svg"
            alt="Benefit Icon"
            class="benefit-icon"
          />
          <div class="benefit-content">
            <h3 class="benefit-title">Unlimited Customization</h3>
            <p class="benefit-detail">
              We build any feature you imagine, from unique checkout processes
              to advanced analytics, tailored to your brand.
            </p>
          </div>
        </div>
        <div class="benefit-item">
          <img
            src="/Graphics/controlDark.svg"
            alt="Benefit Icon"
            class="benefit-icon"
          />
          <div class="benefit-content">
            <h3 class="benefit-title">Total Control</h3>
            <p class="benefit-detail">
              Own your store’s design, data, and operations for long-term
              flexibility and independence from third-party restrictions.
            </p>
          </div>
        </div>
        <div class="benefit-item">
          <img
            src="/Graphics/securityDark.svg"
            alt="Benefit Icon"
            class="benefit-icon"
          />
          <div class="benefit-content">
            <h3 class="benefit-title">Enhanced Security</h3>
            <p class="benefit-detail">
              We use modern security protocols in all our implementations,
              reducing reliance on third-party vulnerabilities and protecting
              customer trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.canvas-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  z-index: 0;
  pointer-events: none;
}

.outer-container {
  width: 100%;
  padding: 0;
  position: relative;
}

.support-section {
  background: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  text-align: left;
  padding: 2rem;
  color: white;
  max-width: calc(1300px + 2rem);
  margin: 0 auto;
  background: none;
  gap: 4rem;
}

.content-wrapper {
  z-index: 2;
  padding: 2rem 0;
  flex: 1;
}

.tag {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 0.9rem;
  background-color: #0072a3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 1rem;
}

.title {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 3rem;
  line-height: 3.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
  color: white;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
}

.btn {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  padding: 10px;
  width: 200px;
  border: none;
  cursor: pointer;
  transition: all 0.1s;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.get-store {
  background-color: #0072a3;
  color: white;
}

.get-store:hover {
  background-color: #004280;
}

.benefits-wrapper {
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.benefit-icon {
  margin-top: 5px;
  width: 64px;
  height: 64px;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.benefit-detail {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  color: white;
  line-height: 1.5;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .support-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 4rem;
  }

  .benefits-wrapper {
    order: -1; /* Moves benefits-wrapper before content-wrapper at this breakpoint */
    align-items: center;
  }

  .benefit-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .button-group {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    line-height: 2.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .benefit-icon {
    margin-top: 0;
    width: 64px;
    height: 64px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0;
  }

  .support-section {
    padding: 4rem 1rem;
  }

  .title {
    font-size: 1.5rem;
    line-height: 1.8rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .benefit-detail {
    font-size: 0.9rem;
  }
}
</style>