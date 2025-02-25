<template>
  <div class="form-responses">
    <div>Views: {{ form.views }}</div>
    <!-- Actions Button -->
    <div class="actions-container">
      <button
        class="actions-button"
        :disabled="selectedResponses.length === 0"
        @click="openModal"
      >
        Actions
      </button>
    </div>

    <div class="table-container">
      <table class="responses-table">
        <thead>
          <tr>
            <!-- Checkbox Header for Select All -->
            <th class="header-cell checkbox-cell">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th class="header-cell email-cell">Email</th>
            <th class="header-cell">Date</th>
            <th class="header-cell">Response Type</th>
            <th
              v-for="question in filteredQuestions"
              :key="question._id"
              class="header-cell question-header-cell"
            >
              <div class="question-header">
                <span
                  class="question-icon"
                  :style="{ color: getTypeConfig(question.type).color }"
                >
                  {{ getTypeConfig(question.type).icon }}
                </span>
                <span class="question-title">{{ question.title }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="response in formResponses"
            :key="response._id"
            class="response-row"
          >
            <!-- Checkbox for Each Row -->
            <td class="response-cell checkbox-cell">
              <input
                type="checkbox"
                :value="response._id"
                v-model="selectedResponses"
              />
            </td>
            <td class="response-cell email-cell">{{ getEmail(response) }}</td>
            <td class="response-cell">
              {{ new Date(response.submittedAt).toISOString() }}
            </td>
            <td class="response-cell">
              {{ response.responseType || "Abandoned" }}
            </td>
            <td
              v-for="question in filteredQuestions"
              :key="question._id"
              class="response-cell"
            >
              <div class="response-box">
                {{ cleanResponse(getResponseForQuestion(response, question)) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Actions Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 class="modal-title">Actions</h2>
        <div class="modal-actions">
          <button class="modal-button" @click="downloadSelected">
            Download Selected
          </button>
          <button class="modal-button delete" @click="openDeleteConfirm">
            Delete Selected
          </button>
          <button class="modal-button cancel" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteConfirmOpen"
      class="modal-overlay"
      @click.self="closeDeleteConfirm"
    >
      <div class="modal">
        <h2 class="modal-title">Confirm Deletion</h2>
        <p class="modal-description">
          Are you sure you want to delete the selected responses? This action
          cannot be undone.
        </p>
        <div class="modal-actions">
          <button class="modal-button delete" @click="deleteSelected">
            Yes, Delete
          </button>
          <button class="modal-button cancel" @click="closeDeleteConfirm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Fetch form and responses
const { data: form } = await useFetch(`/api/forms/${route.params.id}`);
const { data: formResponses } = await useFetch(
  `/api/formResponses/${route.params.id}`
);

// Define typeConfig for consistency with Form Editor
const typeConfig = {
  multiple_choice: {
    color: "#3498db", // Blue
    icon: "🔢", // Number icon
  },
  short_text: {
    color: "#2ecc71", // Green
    icon: "✍️", // Writing hand
  },
  email: {
    color: "#e67e22", // Orange
    icon: "📧", // Email
  },
  phone_number: {
    color: "#9b59b6", // Purple
    icon: "📞", // Telephone
  },
};

// Function to get type-specific config
const getTypeConfig = (type) => {
  return (
    typeConfig[type] || {
      color: "#95a5a6", // Default Gray
      icon: "❓", // Question mark
    }
  );
};

// Filter questions, excluding the email question
const filteredQuestions = computed(() => {
  if (!form.value || !form.value.questions) return [];
  return form.value.questions.filter((q) => q.type !== "email");
});

// Get the email from the response
const getEmail = (response) => {
  const emailResponse = response.responses.find(
    (res) => res.questionType === "email"
  );
  return emailResponse ? emailResponse.response : "N/A";
};

// Get the response for a specific question
const getResponseForQuestion = (response, question) => {
  // Match the question ID to the response questionId
  const questionResponse = response.responses.find(
    (res) => res.questionId === question._id.toString()
  );
  return questionResponse ? questionResponse.response : "N/A";
};

// Clean up the response by removing brackets and quotes
const cleanResponse = (response) => {
  if (Array.isArray(response)) {
    return response.join(", ");
  }
  return response;
};

// Emit to hide loading
const emit = defineEmits(["hide-loading"]);
emit("hide-loading");

// Selected responses
const selectedResponses = ref([]);

// Compute if all responses are selected
const allSelected = computed(() => {
  if (!formResponses.value) return false;
  return (
    formResponses.value.length > 0 &&
    selectedResponses.value.length === formResponses.value.length
  );
});

// Toggle Select All
const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedResponses.value = formResponses.value.map(
      (response) => response._id
    );
  } else {
    selectedResponses.value = [];
  }
};

// Modal state
const isModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);

// Open and Close Modal
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Open and Close Delete Confirmation Modal
const openDeleteConfirm = () => {
  isDeleteConfirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false;
};

// Download selected responses as CSV
const downloadSelected = () => {
  const selected = formResponses.value.filter((response) =>
    selectedResponses.value.includes(response._id)
  );
  if (selected.length === 0) return;

  // Prepare CSV headers
  const headers = [
    "Email",
    "Date",
    "Response Type",
    ...filteredQuestions.value.map((q) => q.title),
  ];

  // Prepare CSV rows
  const rows = selected.map((response) => {
    const email = getEmail(response);
    const date = new Date(response.submittedAt).toLocaleString();
    const responseType = response.responseType || "Abandoned";
    const answers = filteredQuestions.value.map((q) =>
      cleanResponse(getResponseForQuestion(response, q))
    );
    return [email, date, responseType, ...answers];
  });

  // Convert to CSV string
  const csvContent = [headers, ...rows]
    .map((e) => e.map((a) => `"${a.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  // Create a blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  link.setAttribute("download", `form_responses_${timestamp}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Close modal after download
  closeModal();
};

// Delete selected responses
const deleteSelected = async () => {
  const idsToDelete = selectedResponses.value;
  if (idsToDelete.length === 0) return;
  console.log("idsToDelete: " + JSON.stringify(idsToDelete));
  try {
    const response = await $fetch(`/api/formResponses/bulk`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: { ids: idsToDelete }, // $fetch automatically stringifies the body if it's an object
    });

    console.log("response:", response);

    // Remove deleted responses from formResponses
    formResponses.value = formResponses.value.filter(
      (response) => !idsToDelete.includes(response._id)
    );

    // Clear selected responses
    selectedResponses.value = [];

    // Close confirmation modal
    closeDeleteConfirm();
    closeModal();
  } catch (error) {
    console.error("Error deleting responses:", error);
    alert(
      error.data?.message ||
        "An error occurred while deleting responses. Please try again."
    );
  }
};
</script>
  
  <style scoped>
.form-responses {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.actions-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.actions-button {
  padding: 10px 20px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.actions-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 0rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Needed for sticky positioning */
}

.responses-table {
  width: 100%;
  min-width: 1200px; /* Ensure table has a minimum width for horizontal scrolling */
  border-collapse: collapse;
  background-color: #ffffff;
}

.header-cell {
  background-color: #f3f4f6;
  color: #333;
  text-align: left;
  padding: 24px 12px;
  font-weight: bold;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
  height: auto;
  vertical-align: middle;
}

.checkbox-cell {
  width: 50px;
  text-align: center;
}

.question-header-cell {
  min-width: 250px;
}

.response-row {
  min-height: 5rem;
  height: auto;
}

.response-row:nth-child(even) {
  background-color: #f9fafb;
}

.response-row:hover {
  background-color: #f1f5f9;
}

.response-cell {
  padding: 16px;
  vertical-align: middle; /* Center content vertically */
  text-align: center; /* Center content horizontally */
  border-bottom: 1px solid #e5e7eb;
  white-space: normal; /* Allow text wrapping */
}

.checkbox-cell input {
  transform: scale(1.2);
  cursor: pointer;
}

.response-box {
  display: flex;
  align-items: center;
  justify-content: center; /* Center content within the box */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 16px;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.4;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.response-box:hover {
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

.question-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.question-icon {
  font-size: 1.2rem; /* Adjusted size for better visibility */
}

.question-title {
  font-size: 0.9rem;
  color: #444;
  max-height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

/* Sticky email column */
.response-cell.email-cell,
.header-cell.email-cell {
  position: sticky;
  left: 45px; /* Adjusted to account for checkbox column */
  z-index: 2;
  background-color: #f9fafb; /* Match the row background color */
  min-width: 250px; /* Slightly wider column for email */
  font-weight: bold; /* Make email stand out */
  text-align: left;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow to distinguish */
}

/* Adjust other columns' sticky positions */
.header-cell:first-child {
  position: sticky;
  left: 0;
  z-index: 4;
  background-color: #f3f4f6;
}

.response-cell.checkbox-cell {
  position: sticky;
  left: 0;
  z-index: 3;
  background-color: #f9fafb;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
}

/* Sticky header row */
thead tr {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: #f3f4f6;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.modal-description {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #555;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}

.modal-button.delete {
  background-color: #ef4444;
  color: #fff;
}

.modal-button.cancel {
  background-color: #9ca3af;
  color: #fff;
}

.modal-button:not(.delete):not(.cancel) {
  background-color: #2563eb;
  color: #fff;
}

.modal-button:hover {
  opacity: 0.9;
}

/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .table-container {
    padding: 5px;
  }

  .responses-table {
    font-size: 0.85rem;
    min-width: 1000px; /* Adjusted for smaller screens */
  }

  .response-box {
    padding: 6px 8px;
  }

  .question-title {
    font-size: 0.85rem;
  }

  .response-row {
    min-height: 3rem;
  }

  .response-cell.email-cell,
  .header-cell.email-cell {
    min-width: 150px; /* Adjust for smaller screens */
    left: 50px; /* Adjusted for checkbox column */
  }

  .header-cell.checkbox-cell,
  .response-cell.checkbox-cell {
    left: 0;
  }
}
</style>
  