<template>
  <footer class="office-footer">
    <!-- Top black bar with links -->
    <nav class="top-nav">
      <div class="nav-buttons">
        <NuxtLink to="/terms">Terms of Service</NuxtLink>
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      </div>
    </nav>

    <!-- Main background container -->
    <div class="background-container">
      <!-- The dark overlay behind text only (NOT covering input & top nav) -->
      <div class="text-overlay"></div>

      <!-- Main content (Sign up + More Resources) -->
      <div class="content-section">
        <div class="signup-offer">
          <h2>Sign up for exclusive offers</h2>
          <p>Our best deals for our most loyal customers</p>
          <form @submit.prevent="handleEmailSubmit">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              aria-label="Email for exclusive offers"
            />
          </form>
        </div>

        <div class="more-resources">
          <h2>More Resources</h2>
          <ul>
            <li><NuxtLink to="/calc">Revenue Growth Calculator</NuxtLink></li>
            <li>
              <NuxtLink to="/free" @click="handleFreeSEOGuideClick"
                >Free SEO Guide</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/forms/67661cba3a14e729ae1777a1"
                @click="handleBookCallClick"
                >Book a Call</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom black bar -->
    <div class="bottom-bar">
      <p>© 2025 HARTECHO * Powered by HARTECHO</p>
    </div>
  </footer>
</template>

<script setup>
import { useNuxtApp } from "#app";

// Reactive email input
const email = ref("");

// Check if running on localhost to exclude tracking
const isLocalhost = () =>
  process.client &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Function to handle "Free SEO Guide" click with pixel tracking
const handleFreeSEOGuideClick = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Free SEO Guide" });
  }
  // Navigation happens automatically via NuxtLink
};

// Function to handle "Book a Call" click with pixel tracking
const handleBookCallClick = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Book a Call" });
  }
  // Navigation happens automatically via NuxtLink
};

// Function to handle email submission with pixel tracking
const handleEmailSubmit = () => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost() && email.value) {
    $fbq("track", "Lead", {
      content_name: "Exclusive Offers Signup",
      email: email.value,
    });
    // Add your email submission logic here (e.g., API call)
    console.log("Email submitted:", email.value); // Placeholder
    email.value = ""; // Reset input
  }
};
</script>

<style scoped>
.office-footer {
  font-family: Arial, sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
}

/* 1) TOP NAV: black bar with Refund & Privacy links */
.top-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding: 0.75rem 2rem;
  background: #111;
}

.nav-buttons {
  display: flex;
  align-items: center;
  width: 1300px; /* or use max-width to help with responsiveness */
}

.top-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 2rem;
}

.top-nav a:hover {
  text-decoration: underline;
}

/* 2) BACKGROUND CONTAINER + OVERLAY */
.background-container {
  position: relative;
  background: url("/Backgrounds/introBG3.webp") center center no-repeat;
  background-size: cover;
  /* A moderate min-height to mimic the original design’s scale */
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* Default horizontal padding at large screens */
  padding: 0 2rem;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1; /* behind content-section */
}

/* 3) MAIN CONTENT SECTION */
.content-section {
  position: relative;
  z-index: 2; /* above .text-overlay */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10rem;
  /* This container can have a fixed width or max-width to help in large viewports */
  width: 1300px;
  margin-top: 5rem;
}

.signup-offer {
  margin-right: 2rem;
}

.signup-offer h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.signup-offer p {
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-size: 1.1rem;
  font-family: "Source Sans Pro", serif;
  color: #ddd;
}

.signup-offer input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
}

.more-resources h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.more-resources ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.more-resources li {
  margin-bottom: 0.5rem;
}

.more-resources a {
  color: #ddd;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
}

.more-resources a:hover {
  text-decoration: underline;
}

/* 4) BOTTOM BAR */
.bottom-bar {
  background-color: black;
  text-align: center;
  padding: 0.75rem 1rem;
  margin-top: auto;
}

.bottom-bar p {
  margin: 0;
  font-size: 0.9rem;
}

/* ======================================== *
 *       RESPONSIVE BREAKPOINTS
 * ======================================== */

/* At or below 1024px: reduce overall width and spacing a bit */
@media (max-width: 1024px) {
  .nav-buttons {
    width: 100%;
    /* justify-content: space-between; */
  }

  .office-footer {
    margin-top: 2rem;
  }

  .content-section {
    /* width: 90%;
    gap: 5rem;
    margin-top: 3rem; */
  }
}

/* At or below 768px: reduce horizontal padding to 1.5rem; stack content vertically, etc. */
@media (max-width: 768px) {
  .office-footer {
    margin-top: 5rem;
  }

  .top-nav {
    padding: 0.75rem 1.5rem;
  }

  .signup-offer {
    padding-top: 2rem;
  }

  .background-container {
    min-height: 500px;
    padding: 0 1.5rem; /* per your request */
  }

  .content-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 4rem;
    width: 100%;
    margin-top: 1rem;
  }
}

/* At or below 480px: reduce horizontal padding to 1rem; also reduce font sizes, etc. */
@media (max-width: 480px) {
  .top-nav {
    padding: 0.75rem 1rem;
  }

  .background-container {
    padding: 0 1rem; /* per your request */
  }

  .signup-offer h2 {
    margin-bottom: 0;
  }

  .signup-offer h2,
  .more-resources h2 {
    font-size: 2rem;
  }

  .more-resources a {
    font-size: 1rem;
  }
}
</style>