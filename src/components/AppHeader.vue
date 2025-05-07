<template>
  <v-app-bar color="primary" dark flat>
    <v-toolbar-title>
  <span
    class="text-uppercase font-weight-bold cursor-pointer title-link"
    @click="$router.push('/')"
  >
    Jujuy Market
  </span>
    </v-toolbar-title>
    <v-spacer />

    <template v-if="auth.isAuthenticated()">
      <v-avatar size="32" class="mr-2">
        <v-img src="https://i.pravatar.cc/150?img=3" /> <!-- temporal -->
      </v-avatar>
      <v-btn text @click="logout">Salir</v-btn>
    </template>

    <template v-else>
      <v-btn text @click="$router.push('/login')">Ingresar</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAuth } from '@/modules/auth/stores/useAuth'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.title-link {
  display: inline-block;
  transition: 0.3s ease;
}

.title-link:hover {
  opacity: 0.8;
}
</style>
