<template>
  <v-app>
    <AppHeader color="deep-purple accent-4"/>

    <v-main class="bg-blue-grey-darken-2 text-white">
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
