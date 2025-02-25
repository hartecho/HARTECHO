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
        <button type="submit" class="submit-btn">Join Waitlist</button>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const isVisible = ref(true); // Controls visibility of the bar
const email = ref(""); // Stores the email input

// Close the bar
const closeBar = () => {
  isVisible.value = false;
};

// Handle form submission (simplified for this example)
const submitEmail = () => {
  console.log("Email submitted:", email.value);
  // Here, you could add logic to send the email to a backend or API
  email.value = ""; // Clear the input after submission
  alert(
    "Thank you for joining our waitlist! We’ll notify you when we’re available."
  );
};
</script>
  
  <style scoped>
.sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(
    51,
    51,
    51,
    0.95
  ); /* Semi-transparent black, matching service cards */
  color: white;
  padding: 1.5rem 2rem 1rem 2rem; /* Increased top padding to 1.5rem to account for close button overlap */
  z-index: 1000; /* Ensure it stays on top */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow for elevation */
  font-family: "Source Sans Pro", sans-serif;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 1rem; /* Adjusted for better positioning in the top-right corner */
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  z-index: 1001; /* Ensure it stays above other content */
}

.close-btn:hover {
  color: #0072a3; /* Match the accent color from other components */
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
  color: #ccc; /* Slightly lighter text for contrast, matching service card paragraphs */
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
  border-radius: 0; /* No rounded corners, matching buttons in other components */
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); /* Light transparent white for input */
  color: white;
  width: 200px;
  outline: none;
}

.email-input::placeholder {
  color: #999; /* Lighter placeholder text */
}

.submit-btn {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0072a3; /* Match the blue from tags and buttons in other components */
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 0; /* No rounded corners */
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #004280; /* Darker blue on hover, matching other buttons */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sticky-bar {
    padding: 2.5rem 1rem 1rem 1rem; /* Maintain top padding, adjust sides */
  }

  .close-btn {
    right: 0.5rem; /* Adjust positioning for smaller screens */
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
    padding: 2.5rem 0.5rem 1rem 0.5rem; /* Maintain top padding, adjust sides for mobile */
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
</style>