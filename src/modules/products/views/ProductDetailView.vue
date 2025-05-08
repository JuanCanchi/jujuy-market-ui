<template>
  <v-container class="mt-8">
    <v-btn @click="router.back()" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-img :src="product.image_url" height="300" cover />

          <v-card-title class="text-h5 font-weight-bold">
            {{ product.title }}
          </v-card-title>

          <v-card-subtitle class="text-primary text-h6 font-weight-bold">
            {{ product.price }} ARS
          </v-card-subtitle>

          <v-card-text>
            <div class="mb-2">
              <strong>Descripción:</strong>
              <p>{{ product.description }}</p>
            </div>

            <div v-if="product.category_name" class="mb-2">
              <strong>Categoría:</strong> {{ product.category_name }}
            </div>

            <div class="text-caption text-grey">
              Publicado el: {{ formatDate(product.created_at) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/modules/auth/stores/useAuth'
const auth = useAuth()


const route = useRoute()
const router = useRouter()
const product = ref({})

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:8080/products/${route.params.id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
    product.value = res.data
  } catch (err) {
    console.error('Error al cargar el producto:', err)
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
