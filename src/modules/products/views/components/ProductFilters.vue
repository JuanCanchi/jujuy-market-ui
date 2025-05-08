<template>
  <v-card class="pa-4 rounded-lg" elevation="2">
    <h3 class="text-h6 font-weight-bold mb-4">Filtrar productos</h3>

    <v-select
      v-model="filters.categoryId"
      :items="categories"
      item-title="name"
      item-value="id"
      label="Categoría"
      clearable
      density="comfortable"
      class="mb-3"
    />

    <v-text-field
      v-model.number="filters.minPrice"
      label="Precio mínimo"
      type="number"
      density="comfortable"
      class="mb-3"
    />

    <v-text-field
      v-model.number="filters.maxPrice"
      label="Precio máximo"
      type="number"
      density="comfortable"
    />

    <!-- Solo mostrar el botón en móvil -->
    <v-btn
      class="mt-4 d-md-none"
      color="primary"
      block
      @click="emitFilter"
    >
      Aplicar filtros
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['filter'])

const categories = ref([])

const filters = reactive({
  categoryId: null,
  minPrice: null,
  maxPrice: null
})

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/categories')
    categories.value = res.data
  } catch (err) {
    console.error('Error al cargar categorías:', err)
  }
})

// Emitir automáticamente en escritorio
watch(filters, () => {
  if (window.innerWidth >= 960) {
    emitFilter()
  }
}, { deep: true })

function emitFilter() {
  emit('filter', { ...filters })
}
</script>

<style scoped>
.v-card {
  background-color: #f9f9f9;
}
</style>
