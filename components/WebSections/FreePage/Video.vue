<template>
  <section class="video">
    <div class="content-container">
      <!-- Left Content -->
      <div class="info-container">
        <h2 class="section-title">Learn More About HARTECHO</h2>
        <p class="section-text">
          Discover how HARTECHO combines cutting-edge technologies like Nuxt3
          with innovative strategies to deliver exceptional websites and
          marketing solutions. Our goal is to help your business thrive in the
          competitive digital landscape.
        </p>
        <p class="section-text">
          Download our free SEO guide to learn more about how you can optimize
          your website for performance and growth.
        </p>
        <div class="pdf-download-container">
          <a
            class="pdf-download-button"
            href="/HARTECHO_SEO_GUIDE.pdf"
            download
          >
            Download HARTECHO SEO Guide
          </a>
          <img src="/Download.svg" alt="" />
        </div>
      </div>

      <!-- Right Video -->
      <div class="video-container">
        <video controls class="main-video">
          <source src="/3dEmit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
}

.info-container {
  flex: 1;
  text-align: center;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  padding: 20px;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.85;
}

.pdf-download-container {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: left;
}

.pdf-download-button {
  background-color: #01c5ee;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pdf-download-button:hover {
  background-color: #005ba0;
}

img {
  height: 24px;
  width: 24px;
}

.video-container {
  flex: 1;
  width: 100%;
  /* max-width: 600px; */
}

.main-video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    flex-direction: row;
    gap: 50px;
  }

  .info-container {
    text-align: left;
    padding: 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .section-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .video {
    padding: 0;
  }

  .info-container {
    padding: 0;
  }

  .pdf-download-container {
    justify-content: center;
    margin-bottom: 2rem;
  }

  .pdf-download-button {
    padding: 15px;
  }
}
</style>
  