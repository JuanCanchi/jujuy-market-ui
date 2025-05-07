<template>
  <v-app>
    <AppHeader />

    <v-main class="bg-grey-lighten-4">
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'
</script>
