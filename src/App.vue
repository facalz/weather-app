<template>
  <div id="app">
    <div class="flex flex-col min-h-screen font-Roboto bg-dark20">
      <Navbar />
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: rgba(123, 123, 123) rgba(255, 255, 255, 0.05);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(123, 123, 123);
  border-radius: 10px;
  border: 2px none rgba(255, 255, 255, 0.05);
}

ul {
  margin: 0 !important;
  padding: 0 !important;
}

.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>