<template>
  <v-container
    class="fill-height d-flex align-center justify-center text-center"
    style="min-height: 100vh;"
  >
    <v-row class="w-100" justify="center">
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
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/stores/useAuth'

const router = useRouter()
const auth = useAuth()

function goToProducts() {
  router.push('/products')
}
function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.v-btn {
  cursor: pointer;
}
</style>
