<template>
  <div v-if="isVisible" class="sticky-bar">
    <button class="close-btn" @click="closeBar">X</button>
    <div class="bar-content">
      <p class="message">
        We're currently booked with clients. Join our waitlist to be notified
        when we’re available!
      </p>
      <form @submit.prevent="submitEmail" class="waitlist-form">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="email-input"
          required
        />
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          Join Waitlist
        </button>
      </form>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp, useRuntimeConfig } from "#app";

const isVisible = ref(true);
const email = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

// Clear messages after 5 seconds
const clearMessages = () => {
  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 5000);
};

// Close the sticky bar
const closeBar = () => {
  isVisible.value = false;
};

// Handle form submission with Klaviyo and Facebook Pixel tracking
const submitEmail = async () => {
  const { $klaviyo, $klaviyoClientApi, $fbq } = useNuxtApp();

  // Clear any previous messages and indicate submission is in progress
  successMessage.value = "";
  errorMessage.value = "";
  isSubmitting.value = true;

  if (!email.value) {
    errorMessage.value = "Please enter a valid email address.";
    isSubmitting.value = false;
    clearMessages();
    return;
  }

  try {
    // Track the "Lead" event with Klaviyo
    $klaviyo("track", "Joined Waitlist", {
      source: "Popup",
      content_name: "E-commerce Store Waitlist Signup",
      email: email.value,
    });

    // Track the "Lead" event with Meta Pixel (if not on localhost)
    $fbq("track", "Lead", {
      content_name: "E-commerce Store Waitlist Signup",
      email: email.value,
    });

    // Subscribe the user to the waitlist using Klaviyo's client API
    await $klaviyoClientApi.subscribe(
      useRuntimeConfig().public.KLAVIYO_WAITLIST_ID, // Replace with your Klaviyo list ID
      email.value,
      null,
      "Website Sticky Bar Form"
    );

    // On success, show a success message and clear the email field
    successMessage.value = "Thank you! You've been added to the waitlist.";
    email.value = "";
    clearMessages();
  } catch (error) {
    console.error("Error subscribing to waitlist:", error);
    errorMessage.value = "Something went wrong. Please try again later.";
    clearMessages();
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.95);
  color: white;
  padding: 1.5rem 2rem 1rem 2rem;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  font-family: "Source Sans Pro", sans-serif;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  z-index: 1001;
}

.close-btn:hover {
  color: #0072a3;
}

.bar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
}

.message {
  font-size: 1rem;
  margin: 0;
  color: #ccc;
}

.waitlist-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.email-input {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  width: 200px;
  outline: none;
}

.email-input::placeholder {
  color: #999;
}

.submit-btn {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0072a3;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 0;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #004280;
}

@media (max-width: 768px) {
  .sticky-bar {
    padding: 2.5rem 1rem 1rem 1rem;
  }

  .close-btn {
    right: 0.5rem;
  }

  .message {
    font-size: 0.9rem;
  }

  .email-input {
    width: 150px;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .submit-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  .sticky-bar {
    padding: 2.5rem 0.5rem 1rem 0.5rem;
  }

  .close-btn {
    top: 0.3rem;
    right: 0.5rem;
    font-size: 1rem;
  }

  .bar-content {
    align-items: center;
  }

  .waitlist-form {
    flex-direction: column;
    gap: 0.5rem;
  }

  .email-input {
    width: 100%;
    max-width: 200px;
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }

  .submit-btn {
    width: 100%;
    max-width: 200px;
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

/* Success and error message styling */
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
</style>
