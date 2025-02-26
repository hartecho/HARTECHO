<template>
  <section class="video">
    <div class="content-container">
      <!-- Left Content -->
      <div class="info-container">
        <h2 class="section-title">
          Boost Your E-Commerce Success with HARTECHO
        </h2>
        <p class="section-text">
          Our custom-built e-commerce websites allow for advanced SEO and
          performance optimizations. As software engineers, we leverage modern
          coding tools to maximize speed, visibility, and conversions.
        </p>
        <p class="section-text">
          SEO is crucial for e-commerce growth. Our free guide covers the
          powerful strategies we use to achieve superior results. Download it
          now to see how we give our clients a competitive edge
        </p>

        <div class="button-container">
          <!-- <NuxtLink
            to="/forms/67661cba3a14e729ae1777a1"
            class="store-button"
            @click="handleGetNewStore"
            >Get My New Store</NuxtLink
          > -->
          <div class="pdf-download-container">
            <a
              class="pdf-download-button"
              href="/HARTECHO_SEO_GUIDE.pdf"
              download
              @click="handleDownloadSEOGuide"
            >
              Download HARTECHO SEO Guide
            </a>
            <img src="/Graphics/Download.svg" alt="" />
          </div>
        </div>
      </div>

      <!-- Right Video -->
      <div class="video-container">
        <video autoplay muted loop class="main-video">
          <source src="/3dEmit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
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

// Function to handle SEO guide download with pixel tracking
const handleDownloadSEOGuide = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "SEO Guide Download" });
  }
  // Download proceeds automatically via the 'download' attribute
};
</script>

<style scoped>
/* Video Section */
.video {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.content-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
  max-width: 1300px;
  flex-direction: row;
}

.info-container {
  flex: 1;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  text-align: left;
  padding: 0;
}

.section-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.85;
}

.button-container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.store-button {
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
  background-color: #0072a3;
  color: white;
  text-decoration: none;
}

.store-button:hover {
  background-color: #004280;
}

.pdf-download-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: left;
}

.pdf-download-button {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  padding: 10px;
  width: 300px;
  border: none;
  cursor: pointer;
  transition: all 0.1s;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  background-color: #0072a3;
  color: white;
  text-decoration: none;
}

.pdf-download-button:hover {
  background-color: #004280;
}

img {
  height: 24px;
  width: 24px;
}

.video-container {
  flex: 1;
  width: 100%;
}

.main-video {
  width: 100%;
  height: auto;
  /* border-radius: 10px; */
  box-shadow: 15px 15px 10px rgba(0, 0, 0, 1);
}

@media (max-width: 1024px) {
  .video {
    padding: 0;
  }

  .content-container {
    margin-top: 5rem;
    gap: 2rem;
    flex-direction: column;
  }

  .info-container {
    padding: 0;
    text-align: center;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-text {
    font-size: 0.9rem;
  }

  .button-container {
    align-items: center;
  }

  .pdf-download-container {
    justify-content: center;
    margin-bottom: 2rem;
  }

  .store-button {
    width: 200px;
  }

  .pdf-download-button {
    padding: 15px;
    width: 300px;
  }

  .video-container {
    width: 50%;
    order: -1;
  }
}

@media (max-width: 768px) {
  .content-container {
    margin-top: 2rem;
    gap: 2rem;
  }

  .video-container {
    width: 75%;
  }
}

@media (max-width: 480px) {
  .content-container {
    margin-top: 2rem;
    gap: 2rem;
  }

  .main-video {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
  }

  .video-container {
    width: 100%;
  }
}
</style>