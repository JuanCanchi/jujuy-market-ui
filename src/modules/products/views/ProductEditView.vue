<template>
  <v-container class="bg-grey-lighten-4 fill-height d-flex align-center justify-center">
    <v-card class="pa-6" max-width="600" width="100%" color="white">
      <h1 class="text-h5 mb-4">Editar producto</h1>

      <v-form v-if="loaded" @submit.prevent="handleSubmit">
        <v-text-field v-model="title" label="Título" required />
        <v-textarea v-model="description" label="Descripción" rows="3" required />
        <v-text-field v-model="price" label="Precio (ARS)" type="number" required />
        <v-text-field v-model="imageUrl" label="Imagen (URL)" required />

        <v-select
          v-model="categoryId"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Categoría"
          required
        />

        <v-btn type="submit" color="primary" class="mt-4">Guardar cambios</v-btn>
      </v-form>

      <v-skeleton-loader v-else type="article" />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/modules/auth/stores/useAuth'

const route = useRoute()
const router = useRouter()
const auth = useAuth()

const title = ref('')
const description = ref('')
const price = ref('')
const imageUrl = ref('')
const categoryId = ref('')
const categories = ref([])
const loaded = ref(false)

onMounted(async () => {
  try {
    const [productRes, categoriesRes] = await Promise.all([
      axios.get(`http://localhost:8080/products/${route.params.id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      }),
      axios.get('http://localhost:8080/categories')
    ])

    const product = productRes.data
    title.value = product.title
    description.value = product.description
    price.value = product.price
    imageUrl.value = product.image_url
    categoryId.value = product.category_id
    categories.value = categoriesRes.data

    loaded.value = true
  } catch (err) {
    console.error('Error al cargar producto o categorías:', err)
  }
})

const handleSubmit = async () => {
  try {
    await axios.put(`http://localhost:8080/products/${route.params.id}`, {
      title: title.value,
      description: description.value,
      price: parseFloat(price.value),
      image_url: imageUrl.value,
      category_id: categoryId.value || null,
    }, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
    router.push('/dashboard')
  } catch (err) {
    console.error('Error al actualizar producto:', err)
  }
}
</script>
