<template>
  <!-- prettier-ignore -->
  <nav class="nav-bar" ref="navbar">
        <div class="nav-buttons" :style="{'grid-template-columns': getGridTemplateColumns() }">
          <div class="brand">
              <div class="nav-logo-box">
              <NuxtLink to="/" class="">
                <img :src="resolvedLogoPath()" loading="eager" alt="Company Logo" class="nav-logo" />
              </NuxtLink>
            </div>
            <div class="nav-name">
              <h2>HARTECHO</h2>
            </div>
          </div>
          <div class="links">
              <div class="link" v-for="(link, index) in navPaths" :key="index">
                  <NuxtLink :to="getRoute(link)" class="">{{ link.charAt(0).toUpperCase() + link.slice(1) }}</NuxtLink>
              </div>
              <div class="free-btn">
                <NuxtLink to="/free" class="free-text" @click="handleFreeSEOGuideClick">Free SEO Guide</NuxtLink>
              </div>
          </div>
        </div>
        <div class="mobile-bars">
          <div class="brand">
              <div class="nav-logo-box">
              <NuxtLink to="/" class="">
                <img :src="resolvedLogoPath()" loading="eager" alt="Company Logo" class="nav-logo" />
              </NuxtLink>
            </div>
            <div class="nav-name">
              <h2>HARTECHO</h2>
            </div>
          </div>
          <div class="nav-img-wrapper" @click="$emit('toggleMobileNav')">
            <img :src="resolvedNavBarsPath()" loading="eager" alt="nav-bars" />
          </div>
        </div>
      </nav>
</template>

<script setup>
import { useNuxtApp } from "#app";

let navbar = ref(null);
let lastScrollPosition = ref(0);

let props = defineProps({
  navPaths: {
    type: Array,
    validator: function (array) {
      return array.every((item) => typeof item === "string");
    },
    default: () => [],
  },
  navBarsButtonPath: String,
});

// Check if running on localhost to exclude tracking
const isLocalhost = () =>
  process.client &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Function to handle "Free SEO Guide" click with pixel tracking
const handleFreeSEOGuideClick = (event) => {
  const { $fbq } = useNuxtApp();
  if (!isLocalhost()) {
    $fbq("track", "Lead", { content_name: "Free SEO Guide" });
  }
  // Navigation happens automatically via NuxtLink
};

function resolvedLogoPath() {
  return "/HARTECHOLogo.webp";
}

function resolvedNavBarsPath() {
  return "/" + props.navBarsButtonPath;
}

function getGridTemplateColumns() {
  return `repeat(${props.navPaths.length + 1}, auto)`;
}

function getRoute(link) {
  return link === "home" ? "/" : `/${link}`;
}
</script>

<style scoped>
.nav-bar {
  animation: item-load 2s;
  position: absolute;
  top: 0;
  background-color: rgb(22, 22, 23, 1);
  /* backdrop-filter: saturate(180%) blur(20px); */
  z-index: 1000;
  height: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial !important;
  /* transition: top 0.3s ease-in-out; */
}

.nav-bar-hidden {
  top: -75px; /* Adjust this value based on the height of your navbar */
}

.nav-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  gap: 1rem;
}

.nav-logo-box,
.nav-img-wrapper {
  padding: 4px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* background: blue; */
}

.nav-logo {
  height: auto;
  width: 40px;
  padding-top: 5px;
  /* object-fit: cover; */
}

.nav-img-wrapper img {
  height: auto;
  max-width: 100%;
}

.nav-name > h2 {
  font-family: "Poppins";
  font-size: 20px;
}

.links {
  display: flex;
  gap: 1.5rem;
  height: 100%;
  justify-content: center;
  align-items: center;
}

a,
.link {
  font-family: "Source Sans pro", sans-serif;
  text-decoration: none;
  font-size: 1.3rem;
  transition: color 0.15s;
  color: white;
}

a:hover,
.link:hover {
  color: #01c5ee;
}

.free-btn {
  background-color: #0072a3; /* Match intro component blue */
  transition: all 0.1s;
  padding: 10px; /* Match intro component padding */
  width: 200px; /* Ensure identical width for both buttons, match intro component */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0; /* No border radius, as requested */
}

.free-btn:hover {
  background-color: #004280; /* Match intro component hover */
}

.free-text {
  color: white;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem; /* Match intro component font size */
  font-weight: bold;
}

.free-text:hover {
  color: white;
}

.free-text.router-link-exact-active {
  color: white;
}

/* Router link animations */
a.router-link-exact-active {
  transition: color 0.6s;
  color: #01c5ee;
}

.mobile-bars {
  display: none;
}

@media (max-width: 768px) {
  .nav-bar {
    align-items: right;
    justify-content: right;
    height: 4rem;
  }
  .nav-buttons {
    display: none;
  }

  .brand {
    height: 100%;
    position: absolute;
    left: 5%;
    top: 0;
  }

  a,
  .link {
    font-size: 2rem;
  }

  .link {
    margin-bottom: 3rem;
  }

  .mobile-bars {
    display: flex;
    justify-content: flex-end;
    margin-right: 6vw;
  }

  .icon {
    cursor: pointer;
  }
}

@media (max-width: 480px) {
  a,
  .link {
    font-size: 1.5rem;
  }

  h2 {
    font-family: "Poppins";
    font-size: 4vw;
    font-weight: bold;
  }
}
</style>