<template>
  <div class="wrapper">
    <h2>Add/Update Portfolio Item</h2>
    <div class="content">
      <div class="left">
        <select v-model="selectedItem" @change="loadItem" class="select-input">
          <option disabled value="">Please select one</option>
          <option
            v-for="item in portfolioItems"
            :key="item._id"
            :value="item._id"
          >
            {{ item.title }}
          </option>
        </select>

        <input
          type="text"
          v-model="portfolioItem.title"
          placeholder="Title"
          class="input"
        />
        <input
          type="text"
          v-model="portfolioItem.year"
          placeholder="Year"
          class="input"
        />
        <textarea
          v-model="portfolioItem.description"
          placeholder="Description"
          class="textarea"
        ></textarea>
        <input
          type="text"
          v-model="portfolioItem.thumbnail"
          placeholder="Thumbnail Path"
          class="input"
        />
        <input
          type="text"
          v-model="portfolioItem.picture"
          placeholder="Picture Path"
          class="input"
        />
        <input
          type="text"
          v-model="portfolioItem.link"
          placeholder="Link"
          class="input"
        />

        <div>
          <h4>Tags</h4>
          <input
            type="text"
            v-model="newTag"
            placeholder="Add Tag"
            @keydown.enter.prevent="addTag"
            class="input"
          />
          <button @click="addTag" class="icon-button add-button">
            ➕ Add Tag
          </button>
          <div
            v-for="(tag, index) in portfolioItem.tags"
            :key="index"
            class="tag"
          >
            {{ tag }}
            <button @click="removeTag(index)" class="icon-button remove-button">
              ✖ Remove Tag
            </button>
          </div>
        </div>

        <div>
          <h4>More Images</h4>
          <input
            type="text"
            v-model="newImage"
            placeholder="Add More Image URL"
            @keydown.enter.prevent="addImage"
            class="input"
          />
          <button @click="addImage" class="icon-button add-button">
            ➕ Add Image
          </button>
          <div
            v-for="(image, index) in portfolioItem.moreImages"
            :key="index"
            class="image-url"
          >
            {{ image }}
            <button
              @click="removeImage(index)"
              class="icon-button remove-button"
            >
              ✖ Remove Image
            </button>
          </div>
        </div>

        <div class="final-buttons">
          <button @click="addItem" class="icon-button add-button">
            ➕ Add Item
          </button>
          <button @click="updateItem" class="icon-button add-button">
            💾 Update Item
          </button>
          <button @click="deleteItem" class="icon-button remove-button">
            ✖ Delete Item
          </button>
        </div>

        <div class="json-input">
          <h3>Paste JSON to Add New Portfolio Item</h3>
          <textarea
            v-model="jsonInput"
            placeholder="Paste JSON here"
            class="textarea json-textarea"
          ></textarea>
          <button @click="addItemFromJSON" class="icon-button add-button">
            ➕ Add Item from JSON
          </button>
        </div>
      </div>

      <div class="right">
        <h3>Portfolio Item Preview</h3>
        <div class="portfolio-item-preview">
          <div class="img-wrapper" v-if="portfolioItem.picture">
            <NuxtImg
              :src="resolvedImgPath(portfolioItem.picture)"
              :alt="portfolioItem.title"
              class="clickable-image"
              :placeholder="generatePlaceholderUrl(portfolioItem.picture)"
              loading="lazy"
            />
          </div>
          <h3>{{ portfolioItem.title }}</h3>
          <p>{{ portfolioItem.description }}</p>
          <div v-if="portfolioItem.tags.length > 0">
            <h4>Tags</h4>
            <div
              class="tag"
              v-for="(tag, index) in portfolioItem.tags"
              :key="index"
            >
              {{ tag }}
            </div>
          </div>
          <div v-if="portfolioItem.moreImages.length > 0">
            <h4>More Images</h4>
            <div
              class="more-image"
              v-for="(image, index) in portfolioItem.moreImages"
              :key="index"
            >
              <NuxtImg :src="image" alt="Additional Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let portfolioItems = ref([]);
let selectedItem = ref("");
let newTag = ref("");
let newImage = ref("");
let portfolioItem = ref({
  title: "",
  year: "",
  description: "",
  thumbnail: "",
  picture: "",
  link: "",
  tags: [],
  moreImages: [],
});

let jsonInput = ref("");

function init() {
  getPortfolioItems();
  selectedItem.value = "";
  portfolioItem.value = {
    title: "",
    year: "",
    description: "",
    thumbnail: "",
    picture: "",
    link: "",
    tags: [],
    moreImages: [],
  };
}

// Fetch portfolio items on component mount
onMounted(async () => {
  getPortfolioItems();
});

function loadItem() {
  const foundItem = portfolioItems.value.find(
    (item) => item._id === selectedItem.value
  );
  if (foundItem) {
    portfolioItem.value = { ...foundItem };
  }
}

function addTag() {
  if (newTag.value && !portfolioItem.value.tags.includes(newTag.value)) {
    portfolioItem.value.tags.push(newTag.value);
    newTag.value = "";
  }
}

function removeTag(index) {
  portfolioItem.value.tags.splice(index, 1);
}

function addImage() {
  if (newImage.value) {
    portfolioItem.value.moreImages.push(newImage.value);
    newImage.value = "";
  }
}

function removeImage(index) {
  portfolioItem.value.moreImages.splice(index, 1);
}

async function getPortfolioItems() {
  try {
    const response = await $fetch("/api/portfolioItems");
    portfolioItems.value = response || [];
  } catch (error) {
    alert("Error fetching portfolio items: " + error.message);
    console.error("Error fetching portfolio items:", error);
  }
}

async function addItem() {
  try {
    await $fetch("/api/portfolioItems", {
      method: "POST",
      body: portfolioItem.value,
    });
    alert("Portfolio item added successfully");
    getPortfolioItems();
  } catch (error) {
    alert("Error adding portfolio item: " + error.message);
    console.error("Error adding portfolio item:", error);
  }
}

async function updateItem() {
  try {
    await $fetch(`/api/portfolioItems/${portfolioItem.value._id}`, {
      method: "PUT",
      body: portfolioItem.value,
    });
    alert("Portfolio item updated successfully");
    getPortfolioItems();
  } catch (error) {
    alert("Error updating portfolio item: " + error.message);
    console.error("Error updating portfolio item:", error);
  }
}

async function deleteItem() {
  if (!selectedItem.value) {
    alert("Please select a portfolio item to delete");
    return;
  }

  try {
    await $fetch(`/api/portfolioItems/${portfolioItem.value._id}`, {
      method: "DELETE",
    });
    alert("Portfolio item deleted successfully");
    init();
  } catch (error) {
    alert("Error deleting portfolio item: " + error.message);
    console.error("Error deleting portfolio item:", error);
  }
}

function addItemFromJSON() {
  try {
    const parsedItem = JSON.parse(jsonInput.value);
    portfolioItem.value = { ...parsedItem };
    addItem();
    jsonInput.value = "";
  } catch (error) {
    alert("Invalid JSON: " + error.message);
    console.error("Invalid JSON:", error);
  }
}

// Function to generate placeholder URL
const generatePlaceholderUrl = (url) => {
  const lastDotIndex = url.lastIndexOf(".");
  if (lastDotIndex === -1) return url; // If no extension found, return original URL

  const extension = url.slice(lastDotIndex);
  const baseUrl = url.slice(0, lastDotIndex);
  return resolvedImgPath(`${baseUrl}Blur${extension}`);
};

const resolvedImgPath = (path) => {
  if (path) {
    return "/" + path;
  }
  return "/HARTECHOLogo.webp";
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.wrapper {
  padding: 2rem 0;
  width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  gap: 2rem;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
}

.portfolio-item-preview {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.img-wrapper {
  width: 100%;
  height: 25rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-item-preview h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: Proxima Nova, proxima-nova, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Helvetica, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
  font-weight: bold;
  color: #333;
}

.portfolio-item-preview p {
  font-size: 1.2rem;
  margin-bottom: 1.2em;
}

.portfolio-item-preview .tag,
.portfolio-item-preview .more-image {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}

.input,
.textarea,
.select-input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.textarea {
  height: 6rem;
}

button {
  background-color: transparent;
  border: none;
  color: inherit;
  padding: 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  margin: 4px 2px;
  border-radius: 4px;
  transition: color 0.3s ease, transform 0.3s ease;
  margin-right: 2rem;
}

button.remove-button {
  color: #f44336;
}

button.add-button {
  color: #4caf50;
}

button:hover {
  color: #000;
  transform: scale(1.1);
}

.final-buttons {
  margin-top: 2rem;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}

.json-input {
  margin-top: 2rem;
}

.json-input textarea {
  width: 100%;
  height: 10rem;
  margin-bottom: 10px;
}
</style>
