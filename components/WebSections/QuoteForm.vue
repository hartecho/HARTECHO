<template>
  <div class="quote-wrapper">
    <div class="background-layer">
      <div class="quote-header">
        <h1>Request a Service</h1>
        <p>
          Let us help you elevate your business! Fill out the form below, and
          we'll follow up with a call to discuss your unique needs.
        </p>
      </div>
    </div>
    <div class="quote-form-container" v-if="showForm">
      <form @submit.prevent="submitForm" class="quote-form">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Your Name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Email Address"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="Phone Number"
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            placeholder="Describe your business and the marketing services you're looking for..."
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label>Services</label>
          <div class="checkboxes">
            <div class="check">
              <input
                type="checkbox"
                id="ads"
                value="ads"
                v-model="formData.services"
              />
              <label for="ads">Ads</label>
            </div>
            <div class="check">
              <input
                type="checkbox"
                id="websites"
                value="websites"
                v-model="formData.services"
              />
              <label for="websites">Websites</label>
            </div>
            <div class="check">
              <input
                type="checkbox"
                id="seo"
                value="seo"
                v-model="formData.services"
              />
              <label for="seo">SEO</label>
            </div>
            <div class="check">
              <input
                type="checkbox"
                id="branding"
                value="branding"
                v-model="formData.services"
              />
              <label for="branding">Branding</label>
            </div>
            <div class="check">
              <input
                type="checkbox"
                id="web app"
                value="web app"
                v-model="formData.services"
              />
              <label for="web app">Web App</label>
            </div>
          </div>
        </div>
        <div class="incomplete-message" v-if="incomplete">
          <h4>*Please complete all fields before submitting.</h4>
        </div>
        <div class="incomplete-message" v-if="invalidEmail">
          <h4>*Please enter a valid email address.</h4>
        </div>
        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="isLoading">Submitting...</span>
          <span v-else>Get Started!</span>
        </button>
      </form>
    </div>

    <div class="success" v-if="showSuccess">
      <div class="message-wrap">
        <h2>Submission success! Thank you!</h2>
      </div>
    </div>

    <div class="error" v-if="showError">
      <div class="message-wrap">
        <h2>Sorry, there was an error submitting the form!</h2>
        <h3>Please try again or send us an email...</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
  services: [],
});

const showForm = ref(true);
const showSuccess = ref(false);
const showError = ref(false);
const incomplete = ref(false);
const invalidEmail = ref(false);
const isLoading = ref(false);

const submitForm = async () => {
  if (
    formData.value.name == "" ||
    formData.value.email == "" ||
    formData.value.message == ""
  ) {
    invalidEmail.value = false;
    incomplete.value = true;
  } else if (
    !formData.value.email.includes("@") ||
    !formData.value.email.includes(".")
  ) {
    incomplete.value = false;
    invalidEmail.value = true;
  } else {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://8y7wjasxc7.execute-api.us-east-2.amazonaws.com/default/send-contact-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData.value),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Success");
        useNuxtApp().$fbq("track", "Lead");
        showForm.value = false;
        showSuccess.value = true;
      }
    } catch (error) {
      console.log("was error");
      showForm.value = false;
      showError.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.quote-wrapper {
  position: relative;
  font-family: "Roboto", sans-serif;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  color: black;
  padding-bottom: 2rem;
}

.background-layer {
  background: url("/QuoteBG.webp") no-repeat center center;
  background-size: cover;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.quote-header {
  text-align: center;
  color: white;
  padding: 0 1rem;
}

.quote-header h1 {
  font-family: "Poppins";
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.quote-header p {
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
}

.quote-form-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  margin: -100px auto 3rem auto;
  max-width: 800px;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.quote-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea,
button {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
  color: #000;
  transition: border-color 0.3s ease;
  margin-bottom: 0.5rem;
}

input::placeholder,
textarea::placeholder {
  color: #666;
}

input:focus,
textarea:focus {
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.check {
  display: flex;
  align-items: center;
}

.check input {
  margin-right: 0.5rem;
  accent-color: #007bff;
  cursor: pointer;
}

.check label {
  cursor: pointer;
}

.incomplete-message {
  color: red;
  text-align: center;
}

.submit-button {
  background: linear-gradient(45deg, #005ba0, #01c5ee);
  background-size: 200% 200%; /* Increase background size for shimmer effect */
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  transition: transform 0.3s ease, background-position 0.5s ease; /* Smooth transitions */
}

.submit-button:hover {
  background-position: 100% 0; /* Shift the gradient to create shimmer effect */
  transform: scale(1.01);
}

.success,
.error {
  width: 100%;
  text-align: center;
  margin-top: 5rem;
}

@media (max-width: 768px) {
  .quote-form-container {
    margin: -70px 1rem 3rem 1rem;
    padding: 1rem;
  }

  .quote-header h1 {
    font-family: "Poppins";
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .quote-header h1 {
    font-family: "Poppins";
    font-size: 1.75rem;
  }

  .quote-header p {
    font-size: 0.9rem;
  }
}
</style>
