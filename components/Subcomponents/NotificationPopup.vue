<template>
  <transition name="fade">
    <div v-if="visible" class="notification" :class="type">
      {{ message }}
    </div>
  </transition>
</template>
  
  <script setup>
import { ref } from "vue";

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "success", // Can be "success" or "error"
  },
  duration: {
    type: Number,
    default: 3000, // Duration to show the notification in milliseconds
  },
});

const visible = ref(false);

const showNotification = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

onMounted(showNotification);
</script>
  
  <style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
  