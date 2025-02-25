<template>
  <section class="performance-section">
    <div class="content-container">
      <!-- Image Section -->
      <div class="image-container">
        <img
          src="/3Screens.webp"
          alt="Built for Performance"
          class="performance-image"
        />
      </div>
      <!-- Text Section -->
      <div class="text-container">
        <h2 class="section-title">Built for Performance</h2>
        <p class="section-description">
          At HARTECHO, we craft websites that are not just visually stunning,
          but also optimized for speed, SEO, and user experience. Every detail
          is engineered to ensure your customers have the best possible
          interaction with your brand online.
        </p>
        <p class="section-description">
          We leverage cutting-edge technologies, including Nuxt3, to ensure that
          your site outperforms the competition in speed, functionality, and
          design.
        </p>
        <div class="cta">
          <span class="highlighted-stat">500k+</span>
          <span class="stat-label">web interactions optimized</span>
        </div>
        <a href="/performance-details" class="read-more-button">Read More</a>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
</script>
  
  <style scoped>
/* Base Styles for Mobile First Design */
.performance-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
  max-width: 1200px;
}

.image-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
}

.performance-image {
  width: 100%;
  /* max-width: 400px; */
  border-radius: 10px;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); */
}

.text-container {
  flex: 1;
  text-align: center;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.85;
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.highlighted-stat {
  font-size: 2rem;
  font-weight: bold;
  color: #01c5ee;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

.read-more-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #01c5ee;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.read-more-button:hover {
  background-color: #005ba0;
}

/* Responsive Styles for Larger Screens */
@media (min-width: 768px) {
  .content-container {
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
  }

  .text-container {
    text-align: left;
    max-width: 600px;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .section-description {
    font-size: 1.1rem;
  }

  .cta {
    flex-direction: row;
    align-items: baseline;
    gap: 10px;
  }
}
</style>
  