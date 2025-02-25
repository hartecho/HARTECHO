<template>
  <div>
    <NuxtLayout>
      <!-- Page content with transition -->
      <div class="page-wrapper">
        <NuxtPage @hide-loading="hideLoadingScreen" />
      </div>

      <!-- Loading popup controlled by isLoading -->
      <div v-if="isLoading" class="loading-popup">
        <div class="loading-spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const showMobileNav = ref(false);

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/HARTECHOLogo.webp" }],
  htmlAttrs: {
    lang: "en", // Change 'en' to your desired language code
  },
});

const isLoading = ref(false);
const router = useRouter();

// Function to show the loading screen
function showLoadingScreen() {
  isLoading.value = true;
}

// Function to hide the loading screen, can be triggered from any page
function hideLoadingScreen() {
  isLoading.value = false;
}

// Provide the showLoadingScreen function so that child components (pages) can use it
provide("showLoadingScreen", showLoadingScreen);

// Handle route changes to initially show the loading screen
router.beforeEach((to, from, next) => {
  showLoadingScreen();
  next();
});

onMounted(() => {
  window.addEventListener("scroll", revealElementsOnScroll);
  // const metaDescription = document.querySelector('meta[name="description"]');
  // if (metaDescription) {
  //   console.log("Meta description length:");
  //   console.log(metaDescription.getAttribute("content").length);
  // } else {
  //   console.log("Meta description not found.");
  // }
});

onUnmounted(() => {
  window.removeEventListener("scroll", revealElementsOnScroll);
});

function revealElementsOnScroll() {
  var grows = document.querySelectorAll(".divider-grow");
  for (var i = 0; i < grows.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = grows[i].getBoundingClientRect().top;
    var elementVisible = 200;
    if (elementTop < windowHeight - elementVisible) {
      grows[i].classList.add("active");
    } else {
      grows[i].classList.remove("active");
    }
  }
}

watch(showMobileNav, (value) => {
  document.body.style.overflow = value ? "hidden" : ""; // Stops scrolling when mobile nav is open
});
</script>

<style scoped media="screen">
/* Loading popup styling */
.loading-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 20;
  flex-direction: column;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style>
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a:visited,
a:link,
a:focus,
a:active {
  outline: none;
  text-decoration: none;
  background: none;
  color: inherit;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent; /* Removes tap highlight color in mobile browsers */
}

p {
  line-height: 1.5;
}
</style>
