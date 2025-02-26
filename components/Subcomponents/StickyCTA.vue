<template>
  <div class="cta-sidebar" :class="{ large: isLarge, small: !isLarge }">
    <h2>
      Boost your eCommerce success with a
      <u>custom-coded store</u>.
    </h2>
    <div class="cta-content">
      <p class="cta-text">
        Get a high-performance, tailor-made eCommerce store designed for speed,
        SEO, and unbeatable conversions. Say goodbye to template limitations and
        hello to a store that grows with your business.
      </p>
      <NuxtLink
        to="/forms/67661cba3a14e729ae1777a1"
        class="cta-button"
        @click="handleGetNewStore"
        >Get My New Store</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";

const lastScrollTop = ref(0);
const isLarge = ref(true);

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

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop.value) {
    isLarge.value = false;
  } else {
    isLarge.value = true;
  }

  lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.cta-sidebar {
  flex: 1;
  position: -webkit-sticky;
  position: sticky;
  height: fit-content;
  transition: top 0.4s;
}

.cta-sidebar.large {
  top: 3.5rem;
}

.cta-sidebar.small {
  top: 2rem;
}

.cta-sidebar h2 {
  font-family: "Poppins";
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: left;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.cta-text {
  font-size: 1rem;
  font-family: "Merriweather", serif;
  color: #444;
  text-align: left;
  margin-bottom: 1rem;
}

.cta-button {
  display: inline-block;
  background-color: #0072a3; /* Matches other components */
  color: white;
  padding: 10px; /* Matches other components */
  font-family: "Source Sans Pro", sans-serif; /* Matches other components */
  font-size: 1.1rem; /* Matches other components */
  font-weight: bold; /* Matches other components */
  text-decoration: none;
  transition: all 0.1s; /* Matches other components */
  width: 200px; /* Matches other components */
  text-align: center;
  border: none; /* Matches other components */
  border-radius: 0; /* Matches other components */
}

.cta-button:hover {
  background-color: #004280; /* Matches other components */
}

@media (max-width: 768px) {
  .cta-sidebar {
    margin-top: 2rem;
  }
}
</style>