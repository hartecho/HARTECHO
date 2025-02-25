<template>
  <section class="stats-section">
    <div class="stats-container">
      <div class="stat-item">
        <h2 class="stat-value">10+</h2>
        <p class="stat-label">Years of Experience</p>
      </div>
      <span class="divider">/</span>
      <div class="stat-item">
        <h2 class="stat-value">50+</h2>
        <p class="stat-label">Custom Websites Built</p>
      </div>
      <span class="divider">/</span>
      <div class="stat-item">
        <h2 class="stat-value">25+</h2>
        <p class="stat-label">Ad Campaigns Managed</p>
      </div>
      <span class="divider">/</span>
      <div class="stat-item">
        <h2 class="stat-value">100%</h2>
        <p class="stat-label">Client Satisfaction Rate</p>
      </div>
    </div>
    <div class="progress-line"></div>
  </section>
</template>
  
  <script setup>
</script>
  
  <style scoped>
/* Base Styles for Mobile First Design */
.stats-section {
  background: #005ba0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  /* background: transparent; */
  position: relative;
}

.stats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  /* color: #01c5ee; */
  color: white;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.8;
}

.divider {
  font-size: 1.5rem;
  color: #ffffff;
  opacity: 0.5;
}

.progress-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #01c5ee, #005ba0);
  margin-top: 15px;
}

/* Responsive Styles for Larger Screens */
@media (min-width: 768px) {
  .stats-container {
    flex-direction: row;
    justify-content: center;
    gap: 30px;
  }

  .stat-value {
    font-size: 2.5rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  .divider {
    font-size: 2rem;
  }

  .progress-line {
    width: 80%;
  }
}
</style>
  