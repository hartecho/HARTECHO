<template>
  <div class="form-editor-wrapper">
    <div class="editor-navbar">
      <div class="breadcrumbs">
        <NuxtLink to="/forms/dashboard">Dashboard</NuxtLink> > {{ form.title }}
      </div>
    </div>
    <div class="form-editor-container">
      <!-- Left Sidebar Navigation -->
      <aside class="form-editor-sidebar">
        <!-- Use draggable with a <ul> tag -->
        <draggable
          tag="ul"
          v-model="form.questions"
          :item-key="getQuestionKey"
          handle=".drag-handle"
        >
          <template #item="{ element, index }">
            <li
              :key="getQuestionKey(element, index)"
              :class="{ active: activeQuestionIndex === index }"
              @click="setActiveQuestion(index)"
            >
              <!-- Drag Handle -->
              <span class="drag-handle" title="Drag to reorder">☰</span>

              <!-- Type Indicator -->
              <div
                class="type-indicator"
                :style="{ backgroundColor: getTypeConfig(element.type).color }"
              >
                <span class="type-icon">
                  {{ getTypeConfig(element.type).icon }}
                </span>
                <span class="question-number">{{ index + 1 }}</span>
              </div>

              <!-- Question Title -->
              <div class="question-title">
                {{ element.title || "Untitled Question" }}
              </div>

              <!-- Delete Button -->
              <button
                class="delete-question-button"
                @click.stop="deleteQuestion(index)"
              >
                Delete
              </button>
            </li>
          </template>
        </draggable>

        <!-- Add Question Button (outside draggable so it isn’t draggable) -->
        <li class="add-question" @click="addNewQuestion">+ Add Question</li>
      </aside>

      <!-- Main Editor Section -->
      <main class="form-editor-main">
        <header class="form-editor-header">
          <input
            type="text"
            v-model="form.title"
            placeholder="Form Title"
            class="form-title-input"
          />
          <button class="publish-button" @click="saveForm">Save</button>
        </header>

        <!-- Question Editor: Title, Description, Choices -->
        <section class="question-editor" v-if="activeQuestion">
          <div class="question-details">
            <label class="question-field-label">Question Title:</label>
            <input
              type="text"
              v-model="activeQuestion.title"
              placeholder="Your question here..."
              class="question-title-input"
            />

            <label class="question-field-label">Description:</label>
            <textarea
              v-model="activeQuestion.description"
              placeholder="Description (optional)"
              class="question-description-input"
            ></textarea>
          </div>

          <div
            v-if="activeQuestion.type === 'multiple_choice'"
            class="choices-section"
          >
            <h3>Choices</h3>
            <ul>
              <li
                v-for="(choice, index) in activeQuestion.choices"
                :key="index"
              >
                <input
                  type="text"
                  v-model="choice.label"
                  :placeholder="'Choice ' + (index + 1)"
                  class="choice-input"
                />
                <button @click="removeChoice(index)" class="remove-choice">
                  X
                </button>
              </li>
            </ul>
            <button class="add-choice" @click="addChoice">+ Add Choice</button>
          </div>
        </section>
      </main>

      <!-- Right Sidebar: Question Type and Settings -->
      <aside class="form-editor-options-sidebar" v-if="activeQuestion">
        <h2>Question Settings</h2>
        <section class="question-settings">
          <div class="settings-section">
            <label class="question-type-label">Question Type:</label>
            <select v-model="activeQuestion.type" class="question-type-select">
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_text">Short Text</option>
              <option value="long_text">Long Text</option>
              <option value="email">Email</option>
              <option value="phone_number">Phone Number</option>
            </select>
          </div>

          <div class="settings-section">
            <h3>Settings</h3>
            <div class="settings-options">
              <label>
                <input
                  type="checkbox"
                  v-model="activeQuestion.validations.required"
                />
                Required
              </label>
              <label v-if="activeQuestion.type === 'multiple_choice'">
                <input
                  type="checkbox"
                  v-model="activeQuestion.allow_multiple_selection"
                />
                Allow Multiple Selection
              </label>
              <label v-if="activeQuestion.type === 'multiple_choice'">
                <input type="text" v-model="form.redirectUrl" />
                Redirect Url
              </label>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import draggable from "vuedraggable";

// Disable layout if needed
definePageMeta({
  layout: false,
});

// Fetch the form data
const route = useRoute();
const router = useRouter();
const { data: form } = await useFetch(`/api/forms/${route.params.id}`);

// Reactive reference for active question index
const activeQuestionIndex = ref(0);

// Computed property for the active question
const activeQuestion = computed(
  () => form.value.questions[activeQuestionIndex.value]
);

// Function to set the active question
const setActiveQuestion = (index) => {
  activeQuestionIndex.value = index;
};

// Function to add a new question (with a temporary unique ID)
const addNewQuestion = () => {
  form.value.questions.push({
    title: "",
    description: "",
    type: "short_text",
    choices: [],
    validations: { required: false },
    tempId: Date.now() + Math.random(),
  });
  setActiveQuestion(form.value.questions.length - 1);
};

// Function to delete a question with confirmation
const deleteQuestion = (index) => {
  if (confirm("Are you sure you want to delete this question?")) {
    form.value.questions.splice(index, 1);
    if (activeQuestionIndex.value >= form.value.questions.length) {
      activeQuestionIndex.value = form.value.questions.length - 1;
    }
  }
};

// Helper function to return a unique key for each question
const getQuestionKey = (question, index) => {
  return question._id || question.tempId || index;
};

// Functions to manage choices
const addChoice = () => {
  activeQuestion.value.choices.push({ label: "" });
};

const removeChoice = (index) => {
  activeQuestion.value.choices.splice(index, 1);
};

// Function to save the form
const saveForm = async () => {
  try {
    await $fetch(`/api/forms/${form.value._id}`, {
      method: "PUT",
      body: form.value,
    });
    // Optionally navigate away after saving
    // router.push("/forms");
  } catch (error) {
    console.error("Error saving form:", error);
    // Optionally handle error (e.g., show notification)
  }
};

// Emit to hide loading (assuming it's part of your logic)
const emit = defineEmits(["hide-loading"]);
emit("hide-loading");

// Mapping for question types to colors and icons
const typeConfig = {
  multiple_choice: {
    color: "#3498db", // Blue
    icon: "🔢", // Example icon
  },
  short_text: {
    color: "#2ecc71", // Green
    icon: "✍️", // Example icon
  },
  long_text: {
    color: "#5e88aa",
    icon: "✍️", // Example icon
  },
  email: {
    color: "#e67e22", // Orange
    icon: "📧", // Example icon
  },
  phone_number: {
    color: "#9b59b6", // Purple
    icon: "📞", // Example icon
  },
};

// Function to get type-specific config
const getTypeConfig = (type) => {
  return (
    typeConfig[type] || {
      color: "#95a5a6", // Default Gray
      icon: "❓",
    }
  );
};
</script>

<style scoped>
.form-editor-container {
  display: flex;
  height: 90vh;
  background-color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
}

.editor-navbar {
  width: 100%;
  padding: 1rem 1rem 0 1rem;
}

.breadcrumbs {
}

a {
  color: #666;
  transition: text-decoration 0.3s;
}

a:hover {
  text-decoration: underline;
}

/* Left Sidebar Styles */
.form-editor-sidebar {
  width: 20%;
  background: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.form-editor-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

/* Custom Scrollbar for Left Sidebar */
.form-editor-sidebar ul::-webkit-scrollbar {
  width: 8px;
}

.form-editor-sidebar ul::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.form-editor-sidebar ul::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.form-editor-sidebar ul::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
}

/* Draggable list item */
.form-editor-sidebar li {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.form-editor-sidebar li:hover {
  background-color: #f9f9f9;
}

.form-editor-sidebar li.active {
  background-color: #e8f4ff;
  border-color: #3498db;
}

/* Drag Handle Style */
.drag-handle {
  cursor: move;
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* Delete Button for Questions */
.delete-question-button {
  background: #e74c3c;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 0.3rem 0.6rem;
  margin-left: auto;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-question-button:hover {
  background: #c0392b;
}

.type-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-right: 1rem;
}

.type-icon {
  font-size: 1rem;
  margin-right: 0.25rem;
}

.question-number {
  font-weight: bold;
  font-size: 1rem;
}

.question-title {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.2em;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Add Question Button */
.add-question {
  padding: 0.75rem;
  border: 2px dashed #3498db;
  border-radius: 6px;
  text-align: center;
  color: #3498db;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 0.5rem;
}

.add-question:hover {
  background-color: #3498db;
  color: #fff;
}

/* Main Editor Styles */
.form-editor-main {
  flex: 1;
  background: #f4f4f4;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.form-title-input {
  font-size: 1.5rem;
  padding: 0.75rem;
  width: 70%;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.publish-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.publish-button:hover {
  background-color: #2980b9;
}

/* Question Editor Styles in Main Editor */
.question-editor {
  background: #f4f4f4;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.question-details {
  margin-bottom: 1.5rem;
}

.question-field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.question-title-input,
.question-description-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.choices-section h3,
.settings-section h3 {
  margin-bottom: 0.5rem;
}

.choices-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.choices-section li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.choice-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.remove-choice {
  margin-left: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-choice:hover {
  background: #c0392b;
}

.add-choice {
  margin-top: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.add-choice:hover {
  background: #2980b9;
}

/* Right Sidebar Styles */
.form-editor-options-sidebar {
  width: 20%;
  background: #f4f4f4;
  border-left: 1px solid #ddd;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.form-editor-options-sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.question-settings {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.settings-section .question-type-label {
  margin-top: 0;
}

.settings-section .question-type-select {
  margin-bottom: 1rem;
}

.settings-section {
  margin-top: 1rem;
}

.settings-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.settings-section label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .form-editor-container {
    flex-direction: column;
  }

  .form-editor-sidebar,
  .form-editor-options-sidebar {
    width: 100%;
    border: none;
    border-radius: 0;
  }

  .form-editor-main {
    width: 100%;
    box-shadow: none;
  }
}

/* Additional Styles */
.question-editor .question-details,
.question-editor .choices-section,
.question-editor .settings-section {
  /* Add any additional styles if needed to match the actual form */
}
</style>
