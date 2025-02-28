<template>
  <footer class="office-footer">
    <nav class="top-nav">
      <div class="nav-buttons">
        <NuxtLink to="/terms">Terms of Service</NuxtLink>
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      </div>
    </nav>

    <div class="background-container">
      <div class="text-overlay"></div>

      <div class="content-section">
        <div class="signup-offer">
          <h2>Join Our Waitlist</h2>
          <p>Be next in line to get your new custom e-commerce store</p>
          <form @submit.prevent="handleEmailSubmit">
            <div class="input-group">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                aria-label="Email for exclusive offers"
              />
              <button type="submit" :disabled="isSubmitting">Submit</button>
            </div>
            <div class="consent-disclaimer">
              <input
                v-model="consentAgreed"
                type="checkbox"
                id="consent"
                aria-label="Consent to receive updates via email"
              />
              <label for="consent">
                By submitting your email, you agree to receive updates about our
                custom e-commerce store waitlist via email. You can unsubscribe
                at any time.
              </label>
            </div>
            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
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

    <div class="bottom-bar">
      <p>© 2025 HARTECHO * Powered by HARTECHO</p>
    </div>
  </footer>
</template>

<script setup>
import { useNuxtApp } from "#app";

// Reactive inputs and states
const email = ref("");
const consentAgreed = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

// Check if running on localhost to exclude Meta Pixel tracking
const isLocalhost = () =>
  process.client &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Clear messages after a timeout
const clearMessages = () => {
  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 5000); // Clear messages after 5 seconds
};

// Function to handle "Free SEO Guide" click with Meta Pixel tracking
const handleFreeSEOGuideClick = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Free SEO Guide" });
  }
};

// Function to handle "Book a Call" click with Meta Pixel tracking
const handleBookCallClick = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Book a Call" });
  }
};

// Function to handle email submission with Klaviyo and Meta Pixel tracking
const handleEmailSubmit = async () => {
  const { $klaviyo, $klaviyoClientApi, $fbq } = useNuxtApp();

  // Clear previous messages
  successMessage.value = "";
  errorMessage.value = "";
  isSubmitting.value = true;

  if (!email.value) {
    errorMessage.value = "Please enter a valid email address.";
    isSubmitting.value = false;
    clearMessages();
    return;
  }

  if (!consentAgreed.value) {
    errorMessage.value = "Please agree to receive updates before submitting.";
    isSubmitting.value = false;
    clearMessages();
    return;
  }

  try {
    // Track the "Lead" event with Klaviyo
    $klaviyo("track", "Lead", {
      content_name: "E-commerce Store Waitlist Signup",
      email: email.value,
    });

    // Track the "Lead" event with Meta Pixel
    if (!isLocalhost()) {
      $fbq("track", "Lead", {
        content_name: "E-commerce Store Waitlist Signup",
        email: email.value,
      });
    }

    // Subscribe the user to the waitlist
    await $klaviyoClientApi.subscribe(
      useRuntimeConfig().public.KLAVIYO_WAITLIST_ID, // Replace with your Klaviyo list ID
      email.value,
      null,
      "Website Footer Form"
    );

    // Success handling
    successMessage.value = "Thank you! You've been added to the waitlist.";
    email.value = "";
    consentAgreed.value = false;
    clearMessages();
  } catch (error) {
    console.error("Error submitting email or subscribing to waitlist:", error);
    errorMessage.value = "Something went wrong. Please try again later.";
    clearMessages();
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Base styles */
.office-footer {
  font-family: Arial, sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
}

.top-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding: 0.75rem 2rem;
  z-index: 1;
}

.nav-buttons {
  display: flex;
  align-items: center;
  width: 1300px;
  color: white;
}

.nav-buttons a {
  color: white;
}

.top-nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 2rem;
}

.top-nav a:hover {
  text-decoration: underline;
}

.background-container {
  position: relative;
  background: url("/Backgrounds/introBG3.webp") center center no-repeat;
  background-size: cover;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 2rem;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.content-section {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 5rem;
  width: 1300px;
  margin-top: 5rem;
}

.signup-offer {
  margin-right: 2rem;
  width: 50%;
}

.signup-offer h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #fff;
}

#consent {
  width: 1rem;
}

.signup-offer p {
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-size: 1.1rem;
  font-family: "Source Sans Pro", serif;
  color: #ddd;
}

.signup-offer .input-group {
  display: flex;
  gap: 1rem;
}

.signup-offer input {
  width: 250px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #fff;
  color: #333;
}

.signup-offer input::placeholder {
  color: #999;
}

.signup-offer .consent-disclaimer {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ddd;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.signup-offer .consent-disclaimer input[type="checkbox"] {
  margin-top: 0.3rem;
}

.signup-offer .consent-disclaimer label {
  line-height: 1.4;
}

.signup-offer .consent-disclaimer a {
  color: #ddd;
  text-decoration: underline;
}

.signup-offer .consent-disclaimer a:hover {
  color: #fff;
}

.signup-offer button {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: #d9d9d9;
  color: #333;
  cursor: pointer;
}

.signup-offer button:hover {
  background-color: #c0c0c0;
}

.signup-offer button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.success-message {
  margin-top: 1rem;
  color: #4caf50;
  font-size: 0.9rem;
  text-align: center;
}

.error-message {
  margin-top: 1rem;
  color: #f44336;
  font-size: 0.9rem;
  text-align: center;
}

.more-resources h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.more-resources ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.more-resources li {
  margin-bottom: 0.75rem;
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

.bottom-bar {
  background-color: black;
  text-align: center;
  padding: 0.75rem 1rem;
  margin-top: auto;
  color: white;
  z-index: 1;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bottom-bar p {
  margin: 0;
  font-size: 0.9rem;
  color: #fff;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .nav-buttons {
    width: 100%;
  }

  .office-footer {
    margin-top: 2rem;
  }

  .content-section {
    width: 90%;
    gap: 5rem;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .office-footer {
    margin-top: 5rem;
  }

  .top-nav {
    padding: 0.75rem 1.5rem;
  }

  .signup-offer {
    padding-top: 2rem;
    width: 100%;
  }

  .more-resources {
    margin-bottom: 5rem;
  }

  .background-container {
    min-height: 500px;
    padding: 0 1.5rem;
  }

  .content-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 4rem;
    width: 100%;
    margin-top: 1rem;
  }

  .signup-offer .input-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .signup-offer input {
    width: 100%;
  }

  .signup-offer button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .top-nav {
    padding: 0.75rem 1rem;
  }

  .background-container {
    padding: 0 1rem;
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

  .signup-offer .consent-disclaimer {
    font-size: 0.8rem;
  }
}
</style>