<template>
  <div class="workspace-container">
    <!-- Background -->
    <div class="workspace-background">
      <div class="workspace-interface">
        <!-- Header Section -->
        <header class="workspace-header">
          <h1>My Workspace</h1>
          <button class="create-form-button" @click="showModal = true">
            + Create New Form
          </button>
        </header>

        <!-- Filter Section -->
        <div class="filter-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search forms..."
            class="filter-input"
          />
        </div>

        <!-- No Forms Message -->
        <div v-if="filteredForms.length === 0" class="no-forms">
          <img
            src="/HARTECHOLogo.webp"
            alt="No forms logo"
            class="no-forms-logo"
          />
          <p>No forms available. Create a new form to get started!</p>
        </div>

        <!-- Forms Table -->
        <table v-else class="forms-table">
          <thead>
            <tr>
              <th>Form</th>
              <th>Responses</th>
              <th>Completion</th>
              <th>Updated</th>
              <th>Integrations</th>
              <th>Actions</th>
              <!-- New Actions Header -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in filteredForms" :key="form._id" class="form-row">
              <td>{{ form.title }}</td>
              <td>
                <NuxtLink
                  :to="`/formResponses/${form._id}`"
                  class="response-link"
                  @click.stop
                >
                  {{ getResponseCount(form._id) }}
                </NuxtLink>
              </td>
              <td>-</td>
              <td>{{ formatDate(form.updatedAt) }}</td>
              <td><span class="integration-icon">+</span></td>
              <td class="actions-cell">
                <!-- Actions Button -->
                <button
                  class="actions-button"
                  @click.stop="toggleDropdown(form._id)"
                >
                  ⋮
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="openDropdown === form._id"
                  class="dropdown-menu"
                  @click.stop
                >
                  <button class="dropdown-item" @click="openForm(form._id)">
                    Open
                  </button>
                  <button
                    class="dropdown-item delete"
                    @click="confirmDelete(form._id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bottom Section -->
        <div class="bottom-section">
          <p>Responses collected: {{ totalResponses }}</p>
          <button class="increase-limit-button">Increase response limit</button>
        </div>
      </div>

      <!-- Create Form Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h2>Create New Form</h2>
          <p>Choose how you want to create your form:</p>
          <div class="modal-actions">
            <button @click="createFormFromScratch" class="modal-button">
              From Scratch
            </button>
            <button @click="showImportInput = true" class="modal-button">
              Import JSON
            </button>
          </div>

          <!-- Import JSON Input -->
          <div v-if="showImportInput" class="import-section">
            <textarea
              v-model="importedJSON"
              placeholder="Paste your JSON here..."
              class="json-input"
            ></textarea>
            <button @click="importForm" class="modal-button">
              Import Form
            </button>
          </div>

          <button @click="closeModal" class="close-modal">Close</button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirm" class="modal-overlay">
        <div class="modal">
          <h2 class="modal-title">Confirm Deletion</h2>
          <p class="modal-description">
            Are you sure you want to delete this form? This action cannot be
            undone.
          </p>
          <div class="modal-actions">
            <button class="modal-button delete" @click="deleteForm">
              Yes, Delete
            </button>
            <button class="modal-button cancel" @click="cancelDelete">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Initialize the router
const router = useRouter();

// Fetch forms and responses
const { data: forms } = await useFetch("/api/forms");
const { data: responses } = await useFetch("/api/formResponses");

// State variables
const searchQuery = ref("");
const showModal = ref(false);
const showImportInput = ref(false);
const importedJSON = ref("");

// Dropdown state: holds the ID of the form whose dropdown is open
const openDropdown = ref(null);

// Delete confirmation state
const showDeleteConfirm = ref(false);
const formToDelete = ref(null);

// Compute filtered forms based on the search query
const filteredForms = computed(() =>
  forms.value.filter((form) =>
    form.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const totalResponses = computed(() => {
  return responses.value.length;
});

// Calculate the number of responses for a specific formId
const getResponseCount = (formId) => {
  return responses.value.filter((response) => response.formId === formId)
    .length;
};

// Navigate to the form's edit page
const navigateToForm = (formId) => {
  router.push(`/forms/edit/${formId}`);
};

// Open form via the dropdown menu
const openForm = (formId) => {
  navigateToForm(formId);
  closeAllDropdowns();
};

// Toggle the dropdown menu for a specific form
const toggleDropdown = (formId) => {
  if (openDropdown.value === formId) {
    openDropdown.value = null;
  } else {
    openDropdown.value = formId;
  }
};

// Close all dropdown menus
const closeAllDropdowns = () => {
  openDropdown.value = null;
};

// Create a new form from scratch
const createFormFromScratch = async () => {
  try {
    const defaultForm = {
      title: "Untitled Form",
      description: "",
      questions: [],
    };

    const response = await $fetch("/api/forms", {
      method: "POST",
      body: defaultForm,
    });

    if (response && response._id) {
      router.push(`/forms/edit/${response._id}`);
    } else {
      console.error("Failed to create a new form.");
    }
  } catch (error) {
    console.error("Error creating a new form:", error);
    alert("Failed to create a new form. Please try again.");
  } finally {
    closeModal();
  }
};

// Import a form from JSON
const importForm = async () => {
  try {
    const importedForm = JSON.parse(importedJSON.value);

    const response = await $fetch("/api/forms", {
      method: "POST",
      body: importedForm,
    });

    if (response && response._id) {
      router.push(`/forms/edit/${response._id}`);
    } else {
      console.error("Failed to import the form.");
      alert("Failed to import the form. Please check the JSON and try again.");
    }
  } catch (error) {
    console.error("Error importing the form:", error);
    alert("Invalid JSON format. Please check and try again.");
  } finally {
    closeModal();
  }
};

// Close the create form modal
const closeModal = () => {
  showModal.value = false;
  showImportInput.value = false;
  importedJSON.value = "";
  closeAllDropdowns();
};

// Format date for display
const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Emit to hide loading (assuming it's part of your logic)
const emit = defineEmits(["hide-loading"]);
emit("hide-loading");

// Handle Delete Action

// Open delete confirmation modal
const confirmDelete = (formId) => {
  formToDelete.value = formId;
  showDeleteConfirm.value = true;
  closeAllDropdowns();
};

// Cancel delete action
const cancelDelete = () => {
  showDeleteConfirm.value = false;
  formToDelete.value = null;
};

// Delete the selected form
const deleteForm = async () => {
  const formId = formToDelete.value;
  if (!formId) return;

  try {
    const response = await $fetch(`/api/forms/${formId}`, {
      method: "DELETE",
    });

    // console.log("Delete response:", response);

    // Remove the deleted form from the forms list
    forms.value = forms.value.filter((form) => form._id !== formId);

    alert(response.message || "Form deleted successfully.");
  } catch (error) {
    console.error("Error deleting form:", error);
    alert(error.data?.message || "An error occurred while deleting the form.");
  } finally {
    showDeleteConfirm.value = false;
    formToDelete.value = null;
  }
};
</script>



<style scoped>
/* Workspace Container */
.workspace-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.workspace-background {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  padding: 1.5rem;
}

/* Workspace Header */
.workspace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.workspace-header h1 {
  font-size: 1.8rem;
  font-weight: bold;
}

.create-form-button {
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-form-button:hover {
  background-color: #333;
}

/* Filter Bar */
.filter-bar {
  margin-bottom: 1rem;
}

.filter-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* No Forms Message */
.no-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem 0;
  color: #555;
}

.no-forms-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

/* Forms Table */
.forms-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.forms-table thead {
  background-color: #f9f9f9;
}

.forms-table th {
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
  color: #555;
}

.forms-table tbody tr {
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.forms-table tbody tr:hover {
  background-color: #f1f1f1;
}

.response-link {
  display: inline-block; /* Ensure it behaves like other inline elements */
  text-decoration: none; /* Remove default underline for links */
  color: #333; /* Match the text color of other table elements */
  padding: 0.5rem; /* Add padding to align it properly within the cell */
  border-radius: 4px; /* Add some rounding for hover effect */
  transition: background-color 0.2s, color 0.2s; /* Smooth hover effects */
  z-index: 100;
}

.response-link:hover {
  background-color: #f1f1f1; /* Light background on hover */
  color: #000; /* Change text color on hover */
  text-decoration: underline; /* Optional underline to indicate link */
}

.forms-table td {
  padding: 1rem;
  font-size: 0.95rem;
  color: #333;
  vertical-align: middle; /* Ensure all table cells align vertically */
}

.integration-icon {
  font-size: 1.2rem;
  font-weight: bold;
  color: #888;
}

/* Actions Cell Styles */
.actions-cell {
  position: relative; /* For positioning the dropdown menu */
}

.actions-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
}

.actions-button:hover {
  color: #2563eb; /* Change color on hover */
}

/* Dropdown Menu Styles */
.dropdown-menu {
  position: absolute;
  top: 120%; /* Position below the button */
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 150px;
  z-index: 100;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.dropdown-item.delete {
  color: #ef4444; /* Red color for delete option */
}

.dropdown-item.delete:hover {
  background-color: #ffe5e5;
}

/* Bottom Section */
.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

.bottom-section p {
  font-size: 1rem;
  color: #555;
}

.increase-limit-button {
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.increase-limit-button:hover {
  background-color: #333;
}

/* Additional styles for modal */
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
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.modal h2 {
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.modal-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-button:hover {
  background-color: #333;
}

.json-input {
  width: 100%;
  height: 100px;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.close-modal {
  margin-top: 1rem;
  background-color: #f44336;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close-modal:hover {
  background-color: #d32f2f;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .workspace-container {
    padding: 1rem;
  }

  .forms-table th,
  .forms-table td {
    padding: 0.75rem;
  }

  .modal {
    width: 90%;
  }
}
</style>

