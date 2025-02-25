<template>
  <div class="top-banner">
    <div class="scrolling-container">
      <div class="scrolling-content">
        <!-- First Set of Logos -->
        <img
          v-for="(logo, index) in logoList"
          :key="'first-' + index"
          :src="logo"
          :alt="'Logo ' + (index + 1)"
          class="logo-image"
          loading="lazy"
        />
        <!-- Second Set of Logos (Duplicate for Seamless Scroll) -->
        <img
          v-for="(logo, index) in logoList"
          :key="'second-' + index"
          :src="logo"
          :alt="'Logo ' + (index + 1)"
          class="logo-image"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

// List of different logo image paths
const logoList = [
  "/logos/NAHLogo1.webp",
  "/logos/NAHLogo2.webp",
  "/logos/NAHLogo3.webp",
  "/logos/NAHLogo4.webp",
  "/logos/NAHLogo5.webp",
  // Add more logo paths as needed
];
</script>
  
  <style scoped>
/* Banner Styles */
.top-banner {
  background-color: transparent; /* Transparent background */
  padding: 10px 0;
  overflow: hidden;
  position: relative;
  border-bottom: 2px solid white; /* Optional: Adjust or remove as needed */
}

/* Scrolling Container */
.scrolling-container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

/* Scrolling Content */
.scrolling-content {
  display: flex;
  /* Duplicate the animation duration based on the number of logos and spacing */
  animation: scroll-left 20s linear infinite;
}

/* Logo Image Styling */
.logo-image {
  flex: none;
  width: 150px; /* Adjust the width as needed */
  margin-right: 60px; /* Increased space between logos */
  object-fit: contain; /* Maintain aspect ratio */
}

/* Keyframes for Scrolling Animation */
@keyframes scroll-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .logo-image {
    width: 100px;
    margin-right: 40px;
  }
}
</style>
  