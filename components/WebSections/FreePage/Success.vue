<template>
  <section class="success-section">
    <div class="content-container">
      <!-- Text Section -->
      <div class="text-container">
        <h2 class="section-title">Your Partner in Long-Term Success</h2>
        <p class="section-description">
          At HARTECHO, we don't just build websites; we create lasting solutions
          that grow with your business. Our commitment to long-term success
          ensures that your online presence remains competitive, adaptive, and
          impactful in an ever-changing digital landscape.
        </p>
        <p class="section-description">
          With cutting-edge technologies like Nuxt3 and a relentless focus on
          scalability, security, and performance, we provide the foundation for
          sustained growth. HARTECHO is your partner in achieving milestones,
          year after year.
        </p>
        <div class="cta">
          <span class="highlighted-stat">1M+</span>
          <span class="stat-label">web engagements powered</span>
        </div>
        <a href="/long-term-success" class="read-more-button">Learn More</a>
      </div>
      <SubcomponentsScrollBanner />
    </div>
  </section>
</template>
  
  <script setup>
</script>
  
  <style scoped>
/* Base Styles for Mobile First Design */
.success-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  padding: 20px;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
}

.text-container {
  flex: 1;
  text-align: center;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  padding: 0 20px;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.highlighted-stat {
  font-size: 2.5rem;
  font-weight: bold;
  color: #01c5ee;
}

.stat-label {
  font-size: 1.2rem;
  opacity: 0.85;
}

.read-more-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 1rem 2rem;
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

.image-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
}

.success-image {
  width: 100%;
  border-radius: 10px;
}

/* Responsive Styles for Larger Screens */
@media (min-width: 768px) {
  .content-container {
    gap: 50px;
  }

  .text-container {
    text-align: center;
    max-width: 800px;
    padding: 0;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-description {
    font-size: 1.5rem;
  }

  .cta {
    flex-direction: row;
    align-items: baseline;
    gap: 15px;
  }
}
</style>
  