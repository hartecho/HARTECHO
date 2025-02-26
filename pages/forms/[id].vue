<template>
  <div class="survey-container">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <!-- Question Section with Animations -->
    <transition name="fade">
      <div key="currentQuestionIndex" class="question-section">
        <div class="question-content">
          <div class="question-header">
            <span class="question-number">
              {{ currentQuestionIndex + 1 }} →
            </span>
            <h2 class="question">
              {{ currentQuestion.title }}
              <!-- Show star only if required -->
              <span v-if="currentQuestion.validations?.required">*</span>
            </h2>
            <p v-if="currentQuestion.description" class="question-subtitle">
              {{ currentQuestion.description }}
            </p>
          </div>
        </div>

        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple_choice'" class="answers">
          <button
            v-for="(choice, index) in currentQuestion.choices"
            :key="choice.id || index"
            class="answer-button"
            :class="{ selected: isChoiceSelected(choice.label) }"
            @click="toggleAnswer(choice.label)"
          >
            <span
              class="answer-label"
              :class="{ selected: isChoiceSelected(choice.label) }"
            >
              {{ String.fromCharCode(65 + index) }}
            </span>
            <span class="answer-text">{{ choice.label }}</span>
          </button>
        </div>

        <!-- Short Text -->
        <div
          v-else-if="currentQuestion.type === 'short_text'"
          class="text-answer"
        >
          <input
            type="text"
            v-model="shortTextAnswer"
            :placeholder="currentQuestion.placeholder || 'Your answer...'"
            :class="{ error: hasError }"
            @input="clearError"
            @keyup.enter="validateAndNext"
            class="text-input"
          />
        </div>

        <!-- First Name -->
        <div
          v-else-if="currentQuestion.type === 'first_name'"
          class="text-answer"
        >
          <input
            type="text"
            v-model="shortTextAnswer"
            :placeholder="currentQuestion.placeholder || 'Your first name...'"
            :class="{ error: hasError }"
            @input="clearError"
            @keyup.enter="validateAndNext"
            class="text-input"
          />
        </div>

        <!-- Last Name -->
        <div
          v-else-if="currentQuestion.type === 'last_name'"
          class="text-answer"
        >
          <input
            type="text"
            v-model="shortTextAnswer"
            :placeholder="currentQuestion.placeholder || 'Your last name...'"
            :class="{ error: hasError }"
            @input="clearError"
            @keyup.enter="validateAndNext"
            class="text-input"
          />
        </div>

        <!-- Email -->
        <div v-else-if="currentQuestion.type === 'email'" class="text-answer">
          <input
            type="email"
            v-model="shortTextAnswer"
            placeholder="Enter your email"
            :class="{ error: hasError }"
            @input="clearError"
            @keyup.enter="validateAndNext"
            class="text-input"
          />
        </div>

        <!-- Phone Number -->
        <div
          v-else-if="currentQuestion.type === 'phone_number'"
          class="text-answer"
        >
          <input
            type="tel"
            v-model="shortTextAnswer"
            placeholder="Enter your phone number"
            :class="{ error: hasError }"
            @input="clearError"
            @keyup.enter="validateAndNext"
            class="text-input"
          />
        </div>

        <!-- Error Message -->
        <div v-if="hasError" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Actions -->
        <div class="actions">
          <!-- New: Back Button (only if currentQuestionIndex > 0) -->
          <button
            class="prev-button"
            v-if="currentQuestionIndex > 0"
            @click="prevQuestion"
          >
            Back
          </button>

          <button
            class="next-button"
            @click="validateAndNext"
            :disabled="!isAnswerValid || loading"
          >
            <!-- Show 'OK' if not loading, else show spinner -->
            <span v-if="!loading">OK</span>
            <svg v-else class="spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="4"
              ></circle>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- Powered By -->
    <div class="powered-by">
      <img src="/HARTECHOLogo.webp" alt="Hartecho Logo" class="logo" />
      <span>Powered by HARTECHO</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";

// Route and Router instances
const route = useRoute();
const router = useRouter();

// Reactive state
const currentQuestionIndex = ref(0);
const formResponses = ref([]); // local array to store all answers
const selectedAnswers = ref([]); // for multiple-choice answers
const shortTextAnswer = ref(""); // for text, email, phone, etc.
const hasError = ref(false);
const errorMessage = ref("");
const formResponseId = ref(null); // will hold the created record’s ID
const loading = ref(false);

// Fetch the form data using the ID from the URL
const { data: form } = await useFetch(`/api/forms/${route.params.id}`);

// Increase view count on mount and load any previous answer
onMounted(async () => {
  if (form.value) {
    form.value.views += 1;
    await saveForm();
  }
  loadPreviousAnswer();

  // Listen for unload events (refresh/close) so that we save partial progress
  window.addEventListener("beforeunload", handleBeforeUnload);
});

// Remove unload listener on unmount
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

// Also catch SPA navigation
onBeforeRouteLeave((to, from, next) => {
  if (
    form.value &&
    currentQuestionIndex.value < form.value.questions.length - 1
  ) {
    storeCurrentAnswer();
    savePartialResponse();
  }
  next();
});

// Save the form (for example, updating view count)
async function saveForm() {
  try {
    await $fetch(`/api/forms/${form.value._id}`, {
      method: "PUT",
      body: form.value,
    });
  } catch (error) {
    console.error("Error saving form:", error);
  }
}

useSeoMeta({
  title: "Custom-Coded E-Commerce Stores || HARTECHO",
  ogTitle: "Custom-Coded E-Commerce Stores || HARTECHO",
  description:
    "HARTECHO specializes in building custom-coded e-commerce websites using cutting-edge technologies. Fill out this form so we can better understand your unique e-commerce needs.",
  ogDescription:
    "HARTECHO specializes in building custom-coded e-commerce websites using cutting-edge technologies. Fill out this form so we can better understand your unique e-commerce needs.",
  ogImage: "/HARTECHOLogo.webp",
  twitterCard: "/HARTECHOLogo.webp",
});

/**
 * Save the current response progress.
 * • If no record exists (formResponseId is null), create one using POST.
 * • Otherwise, update the record using PUT.
 */
async function savePartialResponse() {
  // First, store the latest answer locally.
  storeCurrentAnswer();
  const payloadObj = {
    formId: form.value._id,
    responses: formResponses.value,
    responseType: "Abandoned",
  };
  const payload = JSON.stringify(payloadObj);

  if (!formResponseId.value) {
    // No record exists yet, so create one.
    try {
      console.log("Creating new form response via POST");
      const response = await $fetch("/api/formResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      if (response && response._id) {
        formResponseId.value = response._id;
        console.log("Form response created with id:", formResponseId.value);
      }
    } catch (error) {
      console.error("Error creating form response:", error);
    }
  } else {
    // Update the existing record using PUT.
    const updateUrl = `/api/formResponses/${formResponseId.value}`;
    console.log("Updating form response via PUT at:", updateUrl);
    try {
      await $fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    } catch (error) {
      console.error("Error updating form response:", error);
    }
  }
}

// Handle beforeunload so that progress is saved if the user leaves
function handleBeforeUnload(event) {
  if (
    form.value &&
    currentQuestionIndex.value < form.value.questions.length - 1
  ) {
    savePartialResponse();
  }
  // No need to cancel the unload
}

// Computed: get the current question
const currentQuestion = computed(() => {
  return form.value?.questions[currentQuestionIndex.value] || {};
});

// Computed: calculate progress percentage
const progressPercentage = computed(() => {
  if (!form.value?.questions?.length) return 0;
  return ((currentQuestionIndex.value + 1) / form.value.questions.length) * 100;
});

// Computed: determine if multiple selection is allowed
const allowsMultiple = computed(() => {
  return (
    currentQuestion.value.type === "multiple_choice" &&
    currentQuestion.value.allow_multiple_selection
  );
});

// Computed: validate the current answer
const isAnswerValid = computed(() => {
  if (!currentQuestion.value?.validations?.required) return true;

  if (currentQuestion.value.type === "multiple_choice") {
    return allowsMultiple.value
      ? selectedAnswers.value.length > 0
      : selectedAnswers.value.length === 1;
  }
  return shortTextAnswer.value.trim().length > 0;
});

// Helpers for multiple-choice questions
function isChoiceSelected(choiceLabel) {
  return selectedAnswers.value.includes(choiceLabel);
}
function toggleAnswer(answer) {
  if (allowsMultiple.value) {
    const index = selectedAnswers.value.indexOf(answer);
    if (index === -1) {
      selectedAnswers.value.push(answer);
    } else {
      selectedAnswers.value.splice(index, 1);
    }
  } else {
    selectedAnswers.value = selectedAnswers.value[0] === answer ? [] : [answer];
  }
}

const isLocalhost = () =>
  process.client &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

/**
 * Validate the answer and then either submit the final form or save partial progress.
 */
async function validateAndNext() {
  if (loading.value) return;
  if (!runLocalValidations()) return;

  // Save current answer locally
  storeCurrentAnswer();

  if (!isLocalhost()) {
    const { $fbq } = useNuxtApp();
    $fbq("trackCustom", "FormStepCompleted", {
      step: currentQuestionIndex.value + 1,
    });
  }

  const isLastQuestion =
    currentQuestionIndex.value === form.value.questions.length - 1;

  if (isLastQuestion) {
    // Final submission: update with responseType "Completed" and await response.
    loading.value = true;
    try {
      await submitResponses("Completed");
      if (!isLocalhost()) {
        const { $fbq } = useNuxtApp();
        $fbq("track", "Lead", { content_name: "Form Submission" });
      }
      nextQuestion(); // triggers final redirect
    } catch (error) {
      console.error("Final submission error:", error);
      hasError.value = true;
      errorMessage.value =
        "An error occurred while submitting your response. Please try again.";
    } finally {
      loading.value = false;
    }
  } else {
    // For intermediate questions, proceed immediately then update partial progress.
    nextQuestion();
    savePartialResponse();
  }
}

/**
 * Store the current question’s answer in formResponses.
 */
function storeCurrentAnswer() {
  const newResponse = {
    questionId: currentQuestion.value._id,
    questionType: currentQuestion.value.type,
    response:
      currentQuestion.value.type === "multiple_choice"
        ? [...selectedAnswers.value]
        : shortTextAnswer.value.trim(),
  };

  const existingIndex = formResponses.value.findIndex(
    (r) => r.questionId === newResponse.questionId
  );
  if (existingIndex !== -1) {
    formResponses.value.splice(existingIndex, 1, newResponse);
  } else {
    formResponses.value.push(newResponse);
  }
}

/**
 * Final submission of responses.
 * Uses POST if no record exists; otherwise uses PUT.
 */
async function submitResponses(responseType) {
  const payloadObj = {
    formId: form.value._id,
    responses: formResponses.value,
    responseType,
  };
  const payload = JSON.stringify(payloadObj);

  if (!formResponseId.value) {
    console.log("Final submission: creating new record via POST");
    try {
      const response = await $fetch("/api/formResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      if (response && response._id) {
        formResponseId.value = response._id;
      }
    } catch (error) {
      console.error("Error creating form response on final submit:", error);
    }
  } else {
    const updateUrl = `/api/formResponses/${formResponseId.value}`;
    console.log("Final submission: updating record via PUT at:", updateUrl);
    try {
      await $fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    } catch (error) {
      console.error("Error updating form response on final submit:", error);
    }
  }
}

// Local validations (e.g. email or phone format)
function runLocalValidations() {
  hasError.value = false;
  errorMessage.value = "";

  if (currentQuestion.value.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shortTextAnswer.value)) {
      hasError.value = true;
      errorMessage.value = "Please enter a valid email address.";
      return false;
    }
  }
  if (currentQuestion.value.type === "phone_number") {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(shortTextAnswer.value)) {
      hasError.value = true;
      errorMessage.value = "Please enter a valid 10-digit phone number.";
      return false;
    }
  }
  return true;
}

// Clear error messages when input changes
function clearError() {
  hasError.value = false;
  errorMessage.value = "";
}

// Move to the next question or complete the form
function nextQuestion() {
  if (currentQuestionIndex.value < form.value.questions.length - 1) {
    currentQuestionIndex.value += 1;
    loadPreviousAnswer();
  } else {
    submitForm();
  }
}

// Go back one question
function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    storeCurrentAnswer();
    currentQuestionIndex.value -= 1;
    loadPreviousAnswer();
  }
}

// Load the stored answer for the current question (if any)
function loadPreviousAnswer() {
  hasError.value = false;
  errorMessage.value = "";
  const question = form.value.questions[currentQuestionIndex.value];
  const existingResp = formResponses.value.find(
    (r) => r.questionId === question._id
  );
  if (existingResp) {
    if (existingResp.questionType === "multiple_choice") {
      selectedAnswers.value = existingResp.response;
      shortTextAnswer.value = "";
    } else {
      shortTextAnswer.value = existingResp.response;
      selectedAnswers.value = [];
    }
  } else {
    selectedAnswers.value = [];
    shortTextAnswer.value = "";
  }
}

// Final form submission (redirect)
function submitForm() {
  window.location.href = form.value.redirectUrl;
}

// Emit an event to hide any loading screen (if used)
const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>


<style scoped>
/* Container */
.survey-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px 4rem 50px 5rem;
  font-family: Arial, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align everything to the left */
  min-height: 85vh;
  position: relative;
  justify-content: center;
}

/* Progress Bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
}
.progress {
  height: 100%;
  background-color: #3498db;
  transition: width 0.3s;
}

/* Question Section */
.question-section {
  text-align: left;
  animation: fade-in 0.5s ease-in-out;
  width: 100%;
}
.question-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  margin-bottom: 3rem;
}
.question-number {
  color: #005ba0;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 4px;
  position: absolute;
  left: -3.5rem;
  top: 0;
}
.question {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 2.2rem;
}
.question-subtitle {
  font-size: 1.2rem;
  color: #555;
}

/* Answers */
.answers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.answer-button {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-size: 1.2rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.answer-button:hover {
  background-color: #eaf4fc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.answer-button.selected {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}
.answer-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-weight: bold;
  font-size: 1rem;
  color: #555;
  background: white;
  padding: 2px 5px;
  border: 1px solid black;
}
.answer-label.selected {
  background-color: #005ba0;
  color: white;
  border-color: #005ba0;
}
.answer-text {
  margin-left: 2rem;
}

/* Actions */
.actions {
  margin-top: 20px;
  text-align: left;
  display: flex;
  gap: 1rem;
}
.prev-button {
  padding: 10px 20px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.prev-button:hover {
  background-color: #bbb;
}
.next-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.next-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.next-button:hover:enabled {
  background-color: #2980b9;
}

/* Text Input */
.text-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.2rem;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: background-color 0.3s, box-shadow 0.3s;
  outline: none;
}
.text-input:focus {
  background-color: #eaf4fc;
  border-color: #3498db;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.text-input::placeholder {
  color: #888;
  font-style: italic;
}

/* Error Styles */
.text-input.error {
  border-color: #e74c3c;
  background-color: #fdecea;
}
.error-message {
  color: #e74c3c;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: bold;
}

/* Spinner Styles */
.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  vertical-align: middle;
  margin-left: 0.5rem;
}
.path {
  stroke: #000; /* or any color you'd like */
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

/* Powered By */
.powered-by {
  position: absolute;
  bottom: 0px;
  right: 4rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}
.logo {
  height: 24px;
  margin-right: 10px;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .survey-container {
    padding: 4rem 1rem 30px 1rem;
    align-items: center;
    justify-content: flex-start;
  }

  .question-number {
    font-size: 1.4rem;
    left: 0;
    top: -2rem;
  }
  .question {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
  .question-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  .answers {
    gap: 6px;
  }
  .answer-button {
    font-size: 1rem;
    padding: 0.75rem;
  }
  .prev-button,
  .next-button {
    font-size: 1rem;
    padding: 8px 16px;
  }
  .powered-by {
    right: 50%;
    transform: translateX(50%);
    bottom: 5px;
    width: 100%;
    justify-content: center;
  }
}
</style>
