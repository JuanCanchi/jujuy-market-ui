<template>
  <v-container>
    <v-btn color="primary" class="mb-4" @click="router.push('/dashboard/products/create')">
      + Crear producto
    </v-btn>

    <h1 class="text-h4 font-weight-bold mb-4">Mis productos</h1>

    <v-alert v-if="products.length === 0" type="info" variant="tonal">
      Todavía no publicaste ningún producto.
    </v-alert>

    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="product.image_url" height="200" cover />
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.price }} ARS</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn icon color="primary" v-bind="props" @click="editProduct(product.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar producto</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/modules/auth/stores/useAuth'

const products = ref([])
const auth = useAuth()
const router = useRouter()

const editProduct = (id) => {
  router.push(`/dashboard/products/edit/${id}`)
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/my-products', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    products.value = res.data
  } catch (err) {
    console.error('Error al cargar productos:', err)
  }
})
</script>
