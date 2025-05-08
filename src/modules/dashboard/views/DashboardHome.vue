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

            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn icon color="red" v-bind="props" @click="confirmDelete(product.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar producto</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">¿Eliminar producto?</v-card-title>
        <v-card-text>Esta acción no se puede deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" text @click="deleteProduct">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="3000" color="green" location="bottom">
      {{ snackbarText }}
    </v-snackbar>
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
const dialog = ref(false)
const productIdToDelete = ref(null)
const snackbar = ref(false)
const snackbarText = ref('')

const editProduct = (id) => {
  router.push(`/dashboard/products/edit/${id}`)
}

const confirmDelete = (id) => {
  productIdToDelete.value = id
  dialog.value = true
}

const deleteProduct = async () => {
  try {
    await axios.delete(`http://localhost:8080/products/${productIdToDelete.value}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    products.value = products.value.filter(p => p.id !== productIdToDelete.value)
    dialog.value = false

    snackbarText.value = 'Producto eliminado correctamente'
    snackbar.value = true
  } catch (err) {
    console.error('Error al eliminar producto:', err)
  }
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
