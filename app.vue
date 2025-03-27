<template>
  <div>
    <NuxtLayout>
      <!-- Page content with transition -->
      <div class="page-wrapper">
        <NuxtPage @hide-loading="hideLoadingScreen" />
      </div>

      <!-- Loading overlay with transition -->
      <transition name="fade">
        <div v-if="isLoading" class="loading-popup">
          <div class="loading-content">
            <!-- Wave Loader: a row of multicolored dots moving up and down -->
            <div class="wave-loader">
              <span class="dot" style="background-color: #ff5733"></span>
              <span class="dot" style="background-color: #ffc300"></span>
              <span class="dot" style="background-color: #daf7a6"></span>
              <span class="dot" style="background-color: #33ff57"></span>
              <span class="dot" style="background-color: #33fff6"></span>
              <span class="dot" style="background-color: #335bff"></span>
              <span class="dot" style="background-color: #8c33ff"></span>
            </div>
            <p>Loading, please wait...</p>
          </div>
        </div>
      </transition>
    </NuxtLayout>
  </div>
</template>

<script setup>
const showMobileNav = ref(false);

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/HARTECHOLogo.webp" }],
  htmlAttrs: {
    lang: "en",
  },
});

const isLoading = ref(false);
const router = useRouter();

// Function to show the loading screen
function showLoadingScreen() {
  isLoading.value = true;
}

// Function to hide the loading screen
function hideLoadingScreen() {
  isLoading.value = false;
}

// Provide the showLoadingScreen function so child pages can call it
provide("showLoadingScreen", showLoadingScreen);

// Show loading screen on route change
router.beforeEach((to, from, next) => {
  showLoadingScreen();
  next();
});

onMounted(() => {
  window.addEventListener("scroll", revealElementsOnScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", revealElementsOnScroll);
});

function revealElementsOnScroll() {
  const grows = document.querySelectorAll(".divider-grow");
  const windowHeight = window.innerHeight;
  const elementVisible = 200;
  grows.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

watch(showMobileNav, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});
</script>

<style scoped>
/* Fade transition for the overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loading overlay styles */
.loading-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85); /* Dark overlay */
  color: white;
  z-index: 20;
  flex-direction: column;
  overflow: hidden;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Wave Loader styling */
.wave-loader {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 15px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 4px;
  animation: wave 1.2s ease-in-out infinite;
}

/* Stagger the animation of each dot */
.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.1s;
}
.dot:nth-child(3) {
  animation-delay: 0.2s;
}
.dot:nth-child(4) {
  animation-delay: 0.3s;
}
.dot:nth-child(5) {
  animation-delay: 0.4s;
}
.dot:nth-child(6) {
  animation-delay: 0.5s;
}
.dot:nth-child(7) {
  animation-delay: 0.6s;
}

/* Keyframes for the vertical wave effect */
@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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
  -webkit-tap-highlight-color: transparent;
}

p {
  line-height: 1.5;
}
</style>
