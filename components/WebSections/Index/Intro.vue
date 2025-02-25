<template>
  <section class="intro-section">
    <!-- <div class="background-overlay"></div> -->
    <!-- <canvas ref="sparkCanvas" class="spark-canvas"></canvas> -->
    <div class="content-wrapper">
      <h1 class="title">E-Commerce Stores That Look Better and Sell More</h1>
      <p class="subtitle">
        Custom-coded for speed, user experience, SEO, and unbeatable conversion
        rates
      </p>
      <div class="logo-container">
        <img class="logo-icon" src="/HARTECHOLogo.webp" alt="Logo" />
      </div>
      <div class="button-group">
        <NuxtLink to="/forms/67661cba3a14e729ae1777a1" class="btn get-store"
          >Get My New Store</NuxtLink
        >
        <button class="btn learn-more">See How It Works</button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.intro-section {
  min-height: 110vh;
  /* background-image: url("/Backgrounds/introBG3.png"); Original background image */
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 1rem;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 1) 100% /* Fully black at the bottom, smooth fade */
  );
  z-index: 1;
}

.spark-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.content-wrapper {
  max-width: 1200px;
  padding: 0 20px;
  z-index: 3;
  position: relative;
  color: white;
  margin-top: -10rem;
}

.title {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  color: #ddd;
  margin-bottom: 35px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 0px;
}

.logo-icon {
  width: 120px;
  height: auto;
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 35px;
  flex-wrap: wrap;
}

.btn {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  padding: 10px;
  width: 200px; /* Ensure identical width for both buttons */
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.get-store {
  background-color: #0072a3;
  color: white;
}

.get-store:hover {
  background-color: #004280;
}

.learn-more {
  background-color: white;
  color: black;
}

.learn-more:hover {
  background-color: #e0e0e0;
}

@media (max-width: 992px) {
  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .logo-icon {
    width: 100px;
  }

  .button-group {
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  .btn {
    font-size: 1rem;
  }

  .button-group {
    /* flex-direction: column; */
    gap: 10px;
  }
}
</style>