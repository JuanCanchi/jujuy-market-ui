<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">Productos pendientes de aprobación</h1>

    <v-alert v-if="products.length === 0" type="info" variant="tonal">
      No hay productos pendientes por aprobar.
    </v-alert>

    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="product.image_url" height="200" cover />
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.price }} ARS</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>

          <v-card-actions>
            <v-btn color="green" @click="updateStatus(product.id, 'APPROVED')">Aprobar</v-btn>
            <v-btn color="red" @click="updateStatus(product.id, 'REJECTED')">Rechazar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="3000" color="green">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuth } from '@/modules/auth/stores/useAuth'

const auth = useAuth()
const products = ref([])
const snackbar = ref(false)
const snackbarText = ref('')

const fetchProducts = async () => {
  try {
    const res = await axios.get('http://localhost:8080/products', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    // Solo productos con status "PENDING"
    products.value = res.data.filter(p => p.status === 'PENDING')
  } catch (err) {
    console.error('Error al obtener productos pendientes:', err)
  }
}

const updateStatus = async (id, status) => {
  try {
    await axios.put(`http://localhost:8080/products/${id}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    products.value = products.value.filter(p => p.id !== id)
    snackbarText.value = `Producto ${status === 'APPROVED' ? 'aprobado' : 'rechazado'} correctamente`
    snackbar.value = true
  } catch (err) {
    console.error('Error al actualizar estado:', err)
  }
}

onMounted(fetchProducts)
</script>
