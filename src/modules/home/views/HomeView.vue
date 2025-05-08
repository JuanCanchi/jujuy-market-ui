<template>
  <v-container class="fill-height d-flex flex-column justify-center text-center" style="min-height: 100vh;">
    <v-row class="w-100" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-carousel
          v-model="currentSlide"
          hide-delimiters
          show-arrows
          cycle
          interval="5000"
          height="400"
        >
          <v-carousel-item
            v-for="product in approvedProducts"
            :key="product.id"
            class="clickable-image"
            @click="goToProduct(product.id)"
          >
            <v-img
              :src="product.image_url"
              cover
              height="400"
              class="d-flex align-end"
            >
              <div class="overlay-info">
                <div class="text-content">
                  <h3>{{ product.title }}</h3>
                  <p>{{ product.price }} ARS</p>
                </div>
              </div>
            </v-img>
          </v-carousel-item>
        </v-carousel>

      </v-col>
    </v-row>

    <!-- Texto de bienvenida -->
    <v-row class="w-100 mt-8" justify="center">
      <v-col cols="12" sm="10" md="8" lg="8" xl="6">
        <h1 class="text-h3 font-weight-bold mb-4">Bienvenido a Jujuy Market</h1>
        <p class="text-subtitle-1 mb-6">
          El mejor lugar para comprar y vender dentro de Jujuy. Publicá gratis, sin complicaciones.
        </p>
        <v-btn color="primary" class="ma-2" @click="goToProducts">Ver productos</v-btn>
        <v-btn
          v-if="!auth.isAuthenticated()"
          color="secondary"
          class="ma-2"
          @click="goToLogin"
        >
          Ingresar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/stores/useAuth'
import axios from 'axios'

const router = useRouter()
const auth = useAuth()

const approvedProducts = ref([])
const currentSlide = ref(0)

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/products')
    approvedProducts.value = res.data.filter(p => p.status === 'APPROVED')
  } catch (err) {
    console.error('Error al cargar productos aprobados:', err)
  }
})

function goToProducts() {
  router.push('/products')
}
function goToLogin() {
  router.push('/login')
}
function goToProduct(id) {
  router.push(`/products/${id}`)
}
</script>

<style scoped>
.clickable-image {
  cursor: pointer;
  position: relative;
}

.custom-img {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.overlay-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px;
}

.text-content h3,
.text-content p {
  margin: 0;
  color: white;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .text-content h3 {
    font-size: 1rem;
  }

  .text-content p {
    font-size: 0.9rem;
  }

  .overlay-info {
    padding: 8px;
  }
}
</style>
