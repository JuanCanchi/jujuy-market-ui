<template>
  <v-text-field
    v-model="search"
    label="Buscar productos"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    density="comfortable"
    clearable
    hide-details
    class="search-bar"
    @input="onInput"
  />
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const search = ref('')

const onInput = () => {
  emit('search', search.value)
}
</script>

<style scoped>
.search-bar {
  max-width: 400px;
  margin-bottom: 1rem;
}
</style>
