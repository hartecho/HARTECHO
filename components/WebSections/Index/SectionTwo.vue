<template>
  <div class="outer-container">
    <canvas ref="backgroundCanvas" class="canvas-background"></canvas>
    <section class="speed-section">
      <div class="image-container">
        <img src="/3Screens.webp" alt="Speed Graphic" />
      </div>
      <div class="content-wrapper">
        <div class="tag">Design</div>
        <h2 class="title">How Can I Enhance My Store’s User Experience?</h2>
        <p class="subtitle first">
          Many e-commerce stores rely on templates, which may look appealing but
          often fail to provide an intuitive purchasing experience for visitors.
        </p>
        <p class="subtitle second">
          As software engineers, we offer complete control over design and user
          experience, enabling us to create unique e-commerce stores that build
          trust and maximize visitor conversions.
        </p>
        <div class="button-group">
          <NuxtLink
            to="/forms/67661cba3a14e729ae1777a1"
            class="btn get-store"
            @click="handleGetNewStore"
          >
            Get My New Store
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";

// Check if running on localhost to exclude tracking
const isLocalhost = () =>
  process.client &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Function to handle "Get My New Store" click with pixel tracking
const handleGetNewStore = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Get My New Store" });
  }
  // Navigation happens automatically via NuxtLink
};
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

.speed-section {
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
  font-weight: 600;
  margin-bottom: 1rem;
}

.subtitle {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
  color: white;
}

.first {
  margin-bottom: 1rem;
}

.second {
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

.test-speed {
  background-color: white;
  color: black;
}

.test-speed:hover {
  background-color: #e0e0e0;
}

.image-container {
  z-index: 2;
  padding: 0;
  flex: 1;
}

.image-container img {
  width: 100%;
  height: auto;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .speed-section {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .button-group {
    justify-content: center;
  }

  .image-container {
    order: 2;
  }
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

  .speed-section {
    padding: 1rem;
  }

  .button-group {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn {
    font-size: 1rem;
    width: 100%;
  }

  .image-container {
    max-width: 100%;
    min-width: 100%;
  }
  img {
    min-width: 100%;
  }
}
</style>