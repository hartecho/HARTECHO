<template>
  <div>
    <!-- Typewriter preloader remains the same -->
    <NavFooterPreloadTypewriterPreloader
      vidPath="BlueHeartVideo2Comp.mp4"
      text="HARTECHO"
    />

    <!-- Conditional Navigation Rendering -->
    <template v-if="route.path.startsWith('/forms')">
      <!-- No nav bar for any /forms route -->
    </template>
    <template v-else-if="route.path.startsWith('/blog')">
      <NavFooterPreloadWhiteBGNav
        :navPaths="paths1"
        @toggleMobileNav="showMobileNav = !showMobileNav"
        navBarsButtonPath="NavBars.svg"
      />
    </template>
    <template v-else>
      <NavFooterPreloadBasicNav
        :navPaths="paths1"
        @toggleMobileNav="showMobileNav = !showMobileNav"
        navBarsButtonPath="NavBars.svg"
      />
    </template>

    <NavFooterPreloadBlackBGMobileNav
      :navPaths="paths1"
      @toggleMobileNav="showMobileNav = !showMobileNav"
      exImg="X.svg"
      :class="{ 'nav-slide-out': !showMobileNav }"
    />

    <div>
      <slot />
    </div>

    <SubcomponentsBookedPopup />

    <footer class="footer">
      <template
        v-if="
          route.path.startsWith('/forms') ||
          route.path.startsWith('/free') ||
          route.path.startsWith('/blog')
        "
      >
        <!-- No nav bar for any /forms route -->
      </template>

      <template v-else> <NavFooterPreloadFooter /> </template>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showMobileNav = ref(false);

// Define your navigation paths
const paths1 = ["home", "blog"];

// Stops scrolling when mobile nav is open
watch(showMobileNav, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});
</script>

<style scoped media="screen">
#app {
  scroll-behavior: smooth;
  background-color: #fff;
  font-family: "Roboto", sans-serif;
  position: static;
}

.content {
  width: 100%;
  height: auto;
  animation: item-load 0.8s;
}

@keyframes item-load {
  0% {
    transform: translateY(8%);
    opacity: 0%;
  }
  50% {
    transform: translateY(8%);
    opacity: 0%;
  }
  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

@keyframes page-load {
  0% {
    transform: translateY(-20%);
    opacity: 0%;
  }
  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

@media (max-width: 768px) {
  body.overflow-hidden {
    overflow: hidden;
  }
  .nav-slide-out {
    transform: translateY(10%);
    opacity: 0;
    z-index: -1;
  }
}
</style>
