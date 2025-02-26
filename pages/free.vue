<template>
  <div class="hartecho-landing">
    <!-- Video Section -->
    <section class="video-section">
      <WebSectionsFreePageVideo />
    </section>

    <!-- Informational Section 1 -->
    <!-- <section class="info-one">
      <WebSectionsFreePageLongBanner />
    </section> -->

    <!-- Informational Section 2 -->
    <!-- <section class="info-section info-two">
      <WebSectionsFreePagePerformance />
    </section> -->

    <!-- Informational Section 3 -->
    <!-- <section class="info-section2 info-three">
      <WebSectionsFreepageSuccess />
    </section> -->

    <!-- Quote Form Section -->
    <!-- <section class="quote-form-section">
      <WebSectionsQuoteForm />
    </section> -->
  </div>
</template>
  
  <script setup>
useSeoMeta({
  title: "Custom-Coded E-Commerce Stores || HARTECHO",
  ogTitle: "Custom-Coded E-Commerce Stores || HARTECHO",
  description:
    "HARTECHO specializes in building custom-coded e-commerce websites using cutting-edge technologies. Get our free SEO guide here to understand the unique benefits we provide.",
  ogDescription:
    "HARTECHO specializes in building custom-coded e-commerce websites using cutting-edge technologies. Get our free SEO guide here to understand the unique benefits we provide.",
  ogImage: "/HARTECHOLogo.webp",
  twitterCard: "/HARTECHOLogo.webp",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://www.hartecho.com/free`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "HARTECHO - Custom Websites & SEO",
        url: "https://www.hartecho.com/free",
        description:
          "HARTECHO creates cutting-edge websites and marketing strategies that drive results. Watch our video, download our SEO guide, and get started today.",
        publisher: {
          "@type": "Organization",
          name: "HARTECHO",
          url: "https://www.hartecho.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.hartecho.com/HARTECHOLogo.webp",
            width: 500,
            height: 500,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-801-793-5456",
            contactType: "Customer Service",
            areaServed: "Global",
            availableLanguage: ["English"],
          },
        },
      }),
    },
  ],
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>
  
  <style scoped>
.hartecho-landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("/Backgrounds/freePageBG.webp") no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
}

section {
  padding: 0px 0px;
  width: 100%;
  position: relative;
}

/* Video Section */
.video-section {
  text-align: center;
  padding: 150px 2rem 250px 2rem;
  height: 100vh;
  display: flex;
}

.info-section {
  text-align: center;
  padding: 150px 2rem 0px 2rem;
}

.info-section2 {
  text-align: center;
  padding: 50px 2rem 50px 2rem;
}

.video-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.main-video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
}

.pdf-download-container {
  margin-top: 20px;
}

.pdf-download-button {
  background-color: #01c5ee;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
}

.pdf-download-button:hover {
  background-color: #005ba0;
}

/* Info Sections */
.info-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.floating-card {
  background: rgba(255, 255, 255, 0.9);
  color: #000000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0 ar30px;
  max-width: 800px;
  width: 90%;
  margin: 20px;
  text-align: center;
}

.reverse {
  flex-direction: row-reverse;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-text {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Quote Form Section */
.quote-form-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0 0;
}

@media (max-width: 768px) {
  .floating-card {
    padding: 20px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-text {
    font-size: 1rem;
  }

  .video-section,
  .info-section {
    padding: 20px;
  }
}
</style>
  