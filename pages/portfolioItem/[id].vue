<template>
  <div class="wrapper" v-if="portfolioItem">
    <div class="top-section">
      <div class="img-wrapper" v-if="portfolioItem.picture">
        <NuxtImg
          :src="resolvedImgPath(portfolioItem.picture)"
          :alt="portfolioItem.title"
          class="clickable-image"
          :placeholder="generatePlaceholderUrl(portfolioItem.picture)"
          loading="eager"
          @load="onImageLoad"
          :class="{ 'image-loaded': imageLoaded }"
        />
      </div>
      <div class="top-details">
        <h1>{{ portfolioItem.title }}</h1>
        <h2>Year:</h2>
        <p>{{ portfolioItem.year }}</p>
        <div v-if="portfolioItem.tags && portfolioItem.tags.length > 0">
          <h2>Scope:</h2>
          <div
            class="tag"
            v-for="(tag, index) in portfolioItem.tags"
            :key="index"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="center-section">
      <div class="logo-wrapper">
        <NuxtImg
          src="/HARTECHOLogo.webp"
          placeholder="/HARTECHOLogoBlur.webp"
          alt="HARTECHO Logo"
          class="logo"
        />
      </div>
      <div class="description">
        <h2 class="about">About this project</h2>
        <p>{{ portfolioItem.description }}</p>
      </div>
    </div>
    <div class="bottom-section">
      <div v-if="portfolioItem.moreImages.length >= 3" class="three-grid">
        <div
          class="grid-item"
          v-for="(image, index) in portfolioItem.moreImages.slice(0, 3)"
          :key="index"
        >
          <NuxtImg
            :src="resolvedImgPath(image)"
            :alt="`Image ${index + 1}`"
            :placeholder="generatePlaceholderUrl(image)"
            loading="lazy"
            @load="() => onGridImageLoad(index)"
            :class="{ 'image-loaded': gridImagesLoaded[index] }"
          />
        </div>
      </div>
      <div v-if="portfolioItem.moreImages.length >= 4" class="large-grid-item">
        <NuxtImg
          :src="resolvedImgPath(portfolioItem.moreImages[3])"
          :alt="`Image 4`"
          :placeholder="generatePlaceholderUrl(portfolioItem.moreImages[3])"
          loading="lazy"
          @load="() => onGridImageLoad(3)"
          :class="{ 'image-loaded': gridImagesLoaded[3] }"
        />
      </div>
      <div v-if="portfolioItem.moreImages.length >= 6" class="two-grid">
        <div
          class="grid-item"
          v-for="(image, index) in portfolioItem.moreImages.slice(4, 6)"
          :key="index"
        >
          <NuxtImg
            :src="resolvedImgPath(image)"
            :alt="`Image ${index + 5}`"
            :placeholder="generatePlaceholderUrl(image)"
            loading="lazy"
            @load="() => onGridImageLoad(index + 4)"
            :class="{ 'image-loaded': gridImagesLoaded[index + 4] }"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Loading...</p>
  </div>
</template>

<script setup>
// Fetch data during build
const route = useRoute();
const { data: portfolioItem } = await useFetch(
  `/api/portfolioItems?_id=${route.params.id}`
);

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

// Function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to format the date
const formattedDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Structured data
const structuredData = computed(() => {
  if (!portfolioItem.value || !window) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: portfolioItem.value.title,
    url: window.location.href,
    image: portfolioItem.value.picture,
    description: portfolioItem.value.description,
    keywords: portfolioItem.value.tags.join(", "),
  };
});

const description = computed(() => {
  return portfolioItem.value
    ? `${portfolioItem.value.title} - Featured HARTECHO Digital Marketing Portfolio Item || #1 Utah-based Marketing Agency`
    : "Featured HARTECHO Digital Marketing Portfolio Item || #1 Utah-based Marketing Agency";
});

watchEffect(() => {
  if (portfolioItem.value) {
    useHead({
      link: [
        {
          rel: "canonical",
          href: `https://www.hartecho.com/portfolioItem/${portfolioItem.value._id}`,
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: portfolioItem.value.title,
            image: portfolioItem.value.thumbnail,
            description: portfolioItem.value.description,
            dateCreated: portfolioItem.value.year,
            keywords: portfolioItem.value.tags.join(", "),
            url: portfolioItem.value.link,
            author: {
              "@type": "Organization",
              name: "HARTECHO",
            },
          }),
        },
      ],
    });

    useSeoMeta({
      title: `${portfolioItem.value.title} - HARTECHO Portfolio`,
      ogTitle: `${portfolioItem.value.title} - HARTECHO Portfolio`,
      description: portfolioItem.value.description,
      ogDescription: portfolioItem.value.description,
      ogImage: portfolioItem.value.thumbnail,
      twitterCard: portfolioItem.value.thumbnail,
    });
  }
});

// State to track image loading status
const imageLoaded = ref(false);
const gridImagesLoaded = ref(
  portfolioItem.value
    ? new Array(portfolioItem.value.moreImages.length).fill(false)
    : []
);

// Function to handle image load event
const onImageLoad = () => {
  imageLoaded.value = true;
};

// Function to handle grid image load event
const onGridImageLoad = (index) => {
  gridImagesLoaded.value[index] = true;
};

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.wrapper {
  padding: 0rem 0;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.top-section {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  width: 100%;
  border-bottom: 0;
}

.img-wrapper {
  height: calc(100vh - 2rem);
  overflow: hidden;
  position: relative;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.img-wrapper img.image-loaded {
  transform: scale(1);
}

.top-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80rem;
  padding-right: 2rem;
}

h1 {
  font-family: "Poppins";
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
}

h2 {
  font-family: "Poppins";
  margin-top: 1rem;
  font-size: 1.3rem;
}

.top-details p {
  font-size: 1.2rem;
  margin-bottom: 1.2em;
  font-weight: light;
  font-style: italic;
}

.tag {
  margin-top: 4px;
}

.center-section {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  max-width: 1200px;
  padding: 0 2rem;
  margin: 5rem auto;
  align-items: center;
  justify-content: center;
}

.logo-wrapper {
  overflow: hidden;
  height: 100%;
  width: auto;
  flex: 1;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.about {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    to top,
    #005ba0,
    #01c5ee
  ); /* Adjust the colors as needed */
  -webkit-background-clip: text;
  color: transparent;
  flex: 2;
}

.description {
  flex: 3;
}

.description p {
  line-height: 1.8rem;
}

.bottom-section {
  /* margin-top: 1.5rem; */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.three-grid {
  display: grid;
  max-height: 100vh;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.grid-item {
  overflow: hidden;
  padding-top: 100%; /* This makes the height equal to the width, creating a square */
  position: relative;
}

.grid-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.grid-item img.image-loaded {
  transform: scale(1);
}

.large-grid-item {
  overflow: hidden;
  position: relative;
  width: 100%;
  max-height: 35rem;
  padding: 0;
  margin-top: 1.5rem;
}

.large-grid-item img {
  width: 100%;
  height: auto; /* Ensure the image maintains its aspect ratio */
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
}

.large-grid-item img.image-loaded {
  transform: scale(1);
}

.two-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #333;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .img-wrapper {
    height: 70vh;
  }

  .top-section {
    flex-direction: column;
    gap: 2rem;
  }

  .top-details {
    width: 100%;
    padding-left: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #ddd; /* Add faint line */
  }

  h1 {
    font-family: "Poppins";
    font-size: 2.5rem;
  }

  .center-section {
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 2rem;
    margin: 2rem auto;
    align-items: center;
    justify-content: center;
  }

  .logo-wrapper {
    height: 10rem;
    width: 10rem;
  }

  .description p {
    line-height: 1.8rem;
  }

  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 650px) {
  .center-section {
    padding: 0 1.5rem;
  }

  .bottom-section {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }

  .three-grid {
    max-height: none;
    grid-template-columns: 1fr;
  }

  .grid-item {
    padding-top: 100%;
  }

  .large-grid-item {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 480px) {
  .center-section {
    padding: 0 1srem;
  }

  .bottom-section {
    padding: 0 1rem;
  }
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
