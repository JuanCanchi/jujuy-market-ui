<template>
  <v-container>
    <h1 class="text-h5 mb-4">Nuevo producto</h1>

    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="title" label="Título" required />
      <v-textarea v-model="description" label="Descripción" rows="3" required />
      <v-text-field v-model="price" label="Precio (ARS)" type="number" required />
      <v-text-field v-model="imageUrl" label="Imagen (URL)" required />

      <v-btn type="submit" color="primary" class="mt-4">Publicar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/stores/useAuth'

const title = ref('')
const description = ref('')
const price = ref('')
const imageUrl = ref('')
const router = useRouter()
const auth = useAuth()

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:8080/products', {
      title: title.value,
      description: description.value,
      price: parseFloat(price.value),
      image_url: imageUrl.value
    }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    router.push('/dashboard')
  } catch (err) {
    console.error('Error al crear producto:', err)
  }
}
</script>
