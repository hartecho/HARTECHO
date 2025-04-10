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
        <NuxtLink
          to="/forms/67661cba3a14e729ae1777a1"
          class="btn get-store"
          @click="handleGetNewStore"
        >
          Get My New Store
        </NuxtLink>
        <!-- Add the @click to trigger the scrollDown function and track event -->
        <button class="btn learn-more" @click="handleSeeHowItWorks">
          See How It Works
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useNuxtApp } from "#app";

// Function to handle "Get My New Store" click with pixel tracking
const handleGetNewStore = (event) => {
  const { $fbq } = useNuxtApp();
  $fbq("track", "Lead", { content_name: "Get My New Store" });
  // Navigation happens automatically via NuxtLink, no need to preventDefault
};

// Function to handle "See How It Works" click with pixel tracking
const handleSeeHowItWorks = () => {
  const { $fbq } = useNuxtApp();
  $fbq("track", "ViewContent", { content_name: "See How It Works" });
  scrollDown(); // Call the scroll function after tracking
};

// Existing scroll function
function scrollDown() {
  window.scrollBy({
    top: 800, // Scroll 800px down; adjust as needed
    behavior: "smooth",
  });
}
</script>

<style scoped>
.intro-section {
  min-height: 80vh;
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 1rem;
}

.content-wrapper {
  max-width: 1200px;
  padding: 0 20px;
  z-index: 3;
  position: relative;
  color: white;
  margin-top: 5rem;
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
  gap: 1rem;
  justify-content: center;
  margin-top: 35px;
  flex-wrap: wrap;
}

.btn {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  padding: 10px;
  width: 200px;
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

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0;
  }

  .subtitle {
    margin-bottom: 1rem;
  }

  .button-group {
    margin-top: 1rem;
  }

  .btn {
    width: 100%;
    font-size: 1rem;
  }
}
</style>