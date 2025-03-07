<template>
  <div class="form-responses">
    <div>Views: {{ form.views }}</div>

    <!-- Top Buttons -->
    <div class="actions-container">
      <button
        class="actions-button"
        :disabled="selectedResponses.length === 0"
        @click="openModal"
      >
        Actions
      </button>
    </div>

    <!-- Filter Panel with Toggle -->
    <div class="filter-container">
      <button class="filter-toggle-button" @click="toggleFilters">
        {{ filtersExpanded ? "–" : "▼" }}
      </button>
      <div v-if="filtersExpanded" class="filter-content">
        <h3>Filters</h3>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="justCompleted" /> Completed Forms Only
        </label>
        <h3>Search</h3>
        <input
          type="text"
          v-model="emailFilter"
          placeholder="Search by email"
          class="filter-input"
        />
        <h3>Sort</h3>
        <select v-model="sortOrder" class="filter-select">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <div class="date-filter">
          <h3>Filter by date range</h3>
          <input type="date" v-model="dateFrom" class="filter-date" />
          <span class="date-separator">to</span>
          <input type="date" v-model="dateTo" class="filter-date" />
        </div>
      </div>
      <h3 v-else>Filters</h3>
    </div>

    <!-- Desktop Table View -->
    <div class="table-container desktop-view">
      <table class="responses-table">
        <thead>
          <tr>
            <th class="header-cell checkbox-cell">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th class="header-cell email-cell">
              <!-- Static header for Name/Email -->
              <div class="name-email">
                <div class="name">Name</div>
                <div class="email">Email</div>
              </div>
            </th>
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
            v-for="response in filteredResponses"
            :key="response._id"
            class="response-row"
          >
            <td class="response-cell checkbox-cell">
              <input
                type="checkbox"
                :value="response._id"
                v-model="selectedResponses"
              />
            </td>
            <td class="response-cell email-cell">
              <div class="name-email">
                <div class="name">{{ getName(response) }}</div>
                <div class="email">{{ getEmail(response) }}</div>
              </div>
            </td>
            <td class="response-cell">
              {{ new Date(response.submittedAt).toLocaleString() }}
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

    <!-- Mobile Card View -->
    <div class="mobile-view">
      <div
        class="mobile-select-all"
        v-if="filteredResponses && filteredResponses.length"
      >
        <label>
          <input
            type="checkbox"
            :checked="allSelected"
            @change="toggleSelectAll"
          />
          Select All
        </label>
      </div>
      <div
        class="response-card"
        v-for="response in filteredResponses"
        :key="response._id"
      >
        <div class="response-card-header">
          <div class="card-header-left">
            <input
              type="checkbox"
              :value="response._id"
              v-model="selectedResponses"
            />
            <div class="name-email">
              <div class="name">{{ getName(response) }}</div>
              <div class="email">{{ getEmail(response) }}</div>
            </div>
          </div>
          <div class="card-header-right">
            <span class="response-date">
              {{ new Date(response.submittedAt).toLocaleString() }}
            </span>
          </div>
        </div>
        <div class="response-details">
          <div class="detail-row">
            <strong class="response-type-text">Response Type:</strong>
            <span>{{ response.responseType || "Abandoned" }}</span>
          </div>
          <button
            class="toggle-answers-button"
            @click="toggleAnswers(response._id)"
          >
            {{ answersExpanded[response._id] ? "Hide Answers" : "See Answers" }}
          </button>
          <div v-if="answersExpanded[response._id]" class="answers">
            <div
              class="detail-row"
              v-for="question in filteredQuestions"
              :key="question._id"
            >
              <div class="question-label">
                <span class="question-title">{{ question.title }}</span>
              </div>
              <div class="answer">
                {{ cleanResponse(getResponseForQuestion(response, question)) }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Fetch form and responses
const { data: form } = await useFetch(`/api/forms/${route.params.id}`);
const { data: formResponses } = await useFetch(
  `/api/formResponses/${route.params.id}`
);

// Type configuration
const typeConfig = {
  multiple_choice: { color: "#3498db", icon: "🔢" },
  short_text: { color: "#2ecc71", icon: "✍️" },
  long_text: { color: "#5e88aa", icon: "✍️" },
  email: { color: "#e67e22", icon: "📧" },
  phone_number: { color: "#9b59b6", icon: "📞" },
  first_name: { color: "#2ecc71", icon: "📝" },
  last_name: { color: "#2ecc71", icon: "📝" },
};
const getTypeConfig = (type) =>
  typeConfig[type] || { color: "#95a5a6", icon: "❓" };

// Filter out the email question from the form questions
const filteredQuestions = computed(() => {
  if (!form.value || !form.value.questions) return [];
  return form.value.questions.filter((q) => q.type !== "email");
});

// Helper to get email
const getEmail = (response) => {
  const emailResponse = response.responses.find(
    (res) => res.questionType === "email"
  );
  return emailResponse ? emailResponse.response : "No Email Given";
};

// Helper to get name using first_name and last_name
const getName = (response) => {
  const firstNameRes = response.responses.find(
    (res) => res.questionType === "first_name"
  );
  const lastNameRes = response.responses.find(
    (res) => res.questionType === "last_name"
  );
  // console.log(JSON.stringify(firstNameRes), JSON.stringify(lastNameRes));
  if (firstNameRes && lastNameRes) {
    return `${firstNameRes.response} ${lastNameRes.response}`;
  }
  return "No Name Given";
};

// Helper to get a specific answer for a question
const getResponseForQuestion = (response, question) => {
  const questionResponse = response.responses.find(
    (res) => res.questionId === question._id.toString()
  );
  return questionResponse ? questionResponse.response : "N/A";
};

const cleanResponse = (response) => {
  return Array.isArray(response) ? response.join(", ") : response;
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");

// FILTERING STATE
const emailFilter = ref("");
const sortOrder = ref("newest");
const justCompleted = ref(true);
const dateFrom = ref("");
const dateTo = ref("");

// Controls for filter panel expansion
const filtersExpanded = ref(true);
const toggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value;
};

// Controls for mobile answers expansion per response id
const answersExpanded = reactive({});
const toggleAnswers = (responseId) => {
  answersExpanded[responseId] = !answersExpanded[responseId];
};

// Compute filtered responses with local date conversion
const filteredResponses = computed(() => {
  if (!formResponses.value) return [];
  return formResponses.value
    .filter((response) => {
      // Email filter
      if (
        emailFilter.value &&
        !getEmail(response)
          .toLowerCase()
          .includes(emailFilter.value.toLowerCase())
      ) {
        return false;
      }
      // Only include if completed
      if (
        justCompleted.value &&
        (response.responseType || "Abandoned") === "Abandoned"
      ) {
        return false;
      }
      // Build local filter boundaries
      const submittedDate = new Date(response.submittedAt);
      if (dateFrom.value) {
        const [year, month, day] = dateFrom.value.split("-").map(Number);
        const fromDate = new Date(year, month - 1, day, 0, 0, 0, 0);
        if (submittedDate < fromDate) return false;
      }
      if (dateTo.value) {
        const [year, month, day] = dateTo.value.split("-").map(Number);
        const toDate = new Date(year, month - 1, day, 23, 59, 59, 999);
        if (submittedDate > toDate) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.submittedAt);
      const dateB = new Date(b.submittedAt);
      return sortOrder.value === "newest" ? dateB - dateA : dateA - dateB;
    });
});

const selectedResponses = ref([]);

const allSelected = computed(() => {
  if (!filteredResponses.value.length) return false;
  return filteredResponses.value.every((response) =>
    selectedResponses.value.includes(response._id)
  );
});

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedResponses.value = filteredResponses.value.map(
      (response) => response._id
    );
  } else {
    selectedResponses.value = [];
  }
};

// MODAL STATE & ACTIONS
const isModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
const openDeleteConfirm = () => {
  isDeleteConfirmOpen.value = true;
};
const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false;
};

const downloadSelected = () => {
  const selected = formResponses.value.filter((response) =>
    selectedResponses.value.includes(response._id)
  );
  if (selected.length === 0) return;
  const headers = [
    "Email",
    "Date",
    "Response Type",
    ...filteredQuestions.value.map((q) => q.title),
  ];
  const rows = selected.map((response) => {
    const email = getEmail(response);
    const date = new Date(response.submittedAt).toLocaleString();
    const responseType = response.responseType || "Abandoned";
    const answers = filteredQuestions.value.map((q) =>
      cleanResponse(getResponseForQuestion(response, q))
    );
    return [email, date, responseType, ...answers];
  });
  const csvContent = [headers, ...rows]
    .map((e) => e.map((a) => `"${a.replace(/"/g, '""')}"`).join(","))
    .join("\n");
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
  closeModal();
};

const deleteSelected = async () => {
  const idsToDelete = selectedResponses.value;
  if (idsToDelete.length === 0) return;
  try {
    await $fetch(`/api/formResponses/bulk`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { ids: idsToDelete },
    });
    formResponses.value = formResponses.value.filter(
      (response) => !idsToDelete.includes(response._id)
    );
    selectedResponses.value = [];
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
/* Base Styles */
.form-responses {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Actions Container */
.actions-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
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

/* Filter Panel */
.filter-container {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
}

.filter-toggle-button {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
}

.filter-input {
  width: 100%;
  max-width: 380px;
}

.filter-select {
  width: 100%;
  max-width: 380px;
}

h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  text-decoration: underline;
  width: 100%;
}

.date-filter {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  max-width: 380px;
}

.filter-date {
  width: 100%;
}

.filter-input,
.filter-select,
.filter-date {
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-separator {
  font-weight: bold;
}

/* Desktop Table Styles */
.table-container {
  width: 100%;
  overflow-x: auto;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.responses-table {
  width: 100%;
  min-width: 1200px;
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
  vertical-align: middle;
  min-width: 200px;
  max-width: 200px;
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
}

.response-row:nth-child(even) {
  background-color: #f9fafb;
}

.response-row:hover {
  background-color: #f1f5f9;
}

.response-cell {
  padding: 16px;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  white-space: normal;
}

.response-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 16px;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.4;
  text-align: left;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.response-box:hover {
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

.question-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.question-icon {
  font-size: 1.2rem;
}

.question-title {
  font-size: 0.9rem;
  color: #444;
  width: 100%;
  max-height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Name/Email Block */
.name-email {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.name {
  font-weight: bold;
}
.email {
  font-size: 0.85rem;
  color: #555;
}

/* Sticky Email Column */
.response-cell.email-cell,
.header-cell.email-cell {
  position: sticky;
  left: 50px;
  z-index: 2;
  background-color: #f9fafb;
  min-width: 200px;
  font-weight: bold;
  text-align: left;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
}

.header-cell:first-child {
  position: sticky;
  left: 0;
  min-width: 50px;
  width: 50px;
  z-index: 4;
  background-color: #f3f4f6;
}

.response-cell.checkbox-cell {
  position: sticky;
  left: 0;
  min-width: 50px;
  width: 50px;
  z-index: 3;
  background-color: #f3f4f6;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
}

thead tr {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: #f3f4f6;
}

/* Modal Styles */
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

/* Mobile View Styles */
@media (max-width: 768px) {
  .filter-container {
    align-self: center;
  }
  .form-responses {
    margin-top: 4rem;
    padding: 1rem;
  }
  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  .mobile-select-all {
    text-align: right;
    margin-bottom: 1rem;
  }
  .mobile-select-all input {
    transform: scale(1.2);
    margin-right: 0.5rem;
  }
  .response-card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .response-card-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }
  .card-header-left {
    display: flex;
    align-items: center;
  }
  .card-header-left input {
    transform: scale(1.2);
    margin-right: 0.5rem;
  }
  .name-email {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .response-email {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .card-header-right {
    margin-top: 0.5rem;
  }
  .response-date {
    font-size: 0.9rem;
    color: #555;
    padding-left: 0.5rem;
  }
  .response-details {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .detail-row {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  .response-type-text {
    margin-right: 0.5rem;
  }
  .question-label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  .mobile-view .question-title {
    max-height: none;
    display: block;
    -webkit-line-clamp: unset;
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
    font-size: 1rem;
    color: #333;
  }
  .answer {
    color: #444;
  }
  .toggle-answers-button {
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 6px 10px;
    /* border-radius: 4px; */
    font-size: 0.9rem;
    margin: 0.5rem 0;
    cursor: pointer;
  }
}

/* Hide Mobile View on Desktop */
@media (min-width: 769px) {
  .mobile-view {
    display: none;
  }
}
</style>
