<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4 text-center">Productos disponibles</h1>

    <!-- Botón solo visible en móvil para abrir el drawer -->
    <v-btn class="mb-4 d-md-none" @click="drawer = true" color="primary">
      <v-icon start>mdi-filter</v-icon>
      Filtrar
    </v-btn>

    <!-- Drawer lateral en móvil -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="d-md-none"
    >
      <ProductFilters @filter="applyFilters" />
    </v-navigation-drawer>

    <v-row>
      <!-- Barra lateral visible solo en escritorio -->
      <v-col cols="12" md="3" class="filters-sidebar d-none d-md-flex">
        <ProductFilters @filter="applyFilters" />
      </v-col>

      <!-- Productos -->
      <v-col cols="12" md="9">
        <SearchBar @search="applySearch" class="mb-4" />

        <v-alert
          v-if="filteredProducts.length === 0"
          type="info"
          variant="tonal"
        >
          No hay productos que coincidan con los filtros.
        </v-alert>

        <v-row>
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card class="hover-card" elevation="3">
              <v-img
                :src="product.image_url"
                height="200"
                cover
                class="rounded-t"
              />
              <v-card-title class="text-truncate">{{ product.title }}</v-card-title>
              <v-card-subtitle class="text-primary font-weight-bold">
                {{ product.price }} ARS
              </v-card-subtitle>
              <v-card-text class="text-truncate">
                {{ product.description }}
              </v-card-text>
              <v-card-text v-if="product.category_name" class="text-caption text-grey">
                Categoría: {{ product.category_name }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="text" @click="goToDetail(product.id)">
                  Ver más <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ProductFilters from '@/modules/products/views/components/ProductFilters.vue'
import SearchBar from '@/modules/products/views/components/SearchBar.vue'

const router = useRouter()
const drawer = ref(false)
const products = ref([])
const filteredProducts = ref([])

const searchText = ref('')
const filters = ref({
  categoryId: null,
  minPrice: null,
  maxPrice: null,
})

const applySearch = (text) => {
  searchText.value = text.toLowerCase()
  filterAll()
}

const applyFilters = (newFilters) => {
  filters.value = newFilters
  filterAll()
  drawer.value = false // cerrar drawer al aplicar filtros
}

const filterAll = () => {
  filteredProducts.value = products.value.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchText.value)
    const matchesCategory = !filters.value.categoryId || p.category_id === filters.value.categoryId
    const matchesMinPrice = filters.value.minPrice == null || p.price >= filters.value.minPrice
    const matchesMaxPrice = filters.value.maxPrice == null || p.price <= filters.value.maxPrice
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
  })
}

const goToDetail = (id) => {
  router.push(`/products/${id}`)
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/products')
    const approved = res.data.filter(p => p.status === 'APPROVED')
    products.value = approved
    filteredProducts.value = approved
  } catch (err) {
    console.error('Error al cargar productos:', err)
  }
})
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.filters-sidebar {
  position: sticky;
  top: 100px;
  align-self: flex-start;
  height: fit-content;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
}
</style>
