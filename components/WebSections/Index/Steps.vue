<template>
  <div class="outer-container">
    <div class="services-section">
      <div class="service-card">
        <div class="icon">
          <img src="/Graphics/bookLight.svg" alt="Consultation Icon" />
        </div>
        <h2>Expert Consultation</h2>
        <p>
          Not sure what to do next? Our team will help you find the best
          solutions for your specific needs.
        </p>
      </div>

      <div class="service-card">
        <div class="icon">
          <img src="/Graphics/lightningLight.svg" alt="Development Icon" />
        </div>
        <h2>Fast Development</h2>
        <p>
          Our team plans, builds, tests, and launches most stores in just 45
          days after consultation.
        </p>
      </div>

      <div class="service-card">
        <div class="icon">
          <img src="/Graphics/customLight.svg" alt="Functionality Icon" />
        </div>
        <h2>Custom Features</h2>
        <p>
          Skip the extra costs of third-party apps. We can create almost any
          feature you want, including things you enjoy on your current store.
        </p>
      </div>

      <div class="service-card">
        <div class="icon">
          <img src="/Graphics/infinityLight.svg" alt="Flexibility Icon" />
        </div>
        <h2>Full Flexibility</h2>
        <p>
          We’ll build your store exactly how you want it, making sure every
          detail matches your vision.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.outer-container {
  width: 100%;
  padding: 0;
  background: transparent;
}

.services-section {
  display: flex;
  gap: 2rem;
  padding: 0rem 2rem 6rem 2rem;
  background: transparent;
  color: white;
  justify-content: center;
  max-width: calc(1300px + 2rem);
  margin: 0 auto;
  flex-wrap: nowrap;
}

.service-card {
  background-color: rgba(51, 51, 51, 0.8);
  padding: 2rem 1rem;
  flex: 1;
  min-width: 0;
  text-align: left;
  z-index: 10;
}

.service-card:hover {
  background-color: rgba(51, 51, 51, 1);
}

.icon {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

img {
  height: 3rem;
  width: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

p {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .services-section {
    gap: 1.5rem;
    padding: 0 1rem 4rem 1rem;
  }

  .service-card {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .services-section {
    flex-wrap: wrap;
    justify-content: center;
  }

  .service-card {
    flex: 0 1 calc(50% - 1rem);
    max-width: 20rem;
    padding: 1.5rem;
    text-align: center;
  }

  .icon {
    justify-content: center;
  }

  h2 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 0 1rem 3rem 1rem;
    gap: 1rem;
  }

  .service-card {
    flex: 0 1 100%;
    padding: 1rem;
    text-align: center;
  }

  img {
    height: 2.5rem;
    width: 2.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  p {
    font-size: 0.85rem;
  }
}
</style>