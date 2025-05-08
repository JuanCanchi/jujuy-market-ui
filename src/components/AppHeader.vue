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
      <v-avatar size="32" class="mr-2" color="deep-purple accent-4">
  <span class="white--text text-subtitle-2">
    {{ userInitials }}
  </span>
      </v-avatar>

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>Mi perfil</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="auth.role === 'ADMIN'" @click="goToAdmin">
            <v-list-item-title>Admin productos</v-list-item-title>
          </v-list-item>

          <v-list-item  @click="goToDashboard">
            <v-list-item-title>Mis productos</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <v-btn text @click="$router.push('/login')">Ingresar</v-btn>
      <v-btn text @click="$router.push('/register')">Registrarse</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAuth } from '@/modules/auth/stores/useAuth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const auth = useAuth()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}

const goToAdmin = () => {
  router.push('/admin/products')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToProfile = () => {
  router.push('/dashboard/profile') // futuro
}

const userInitials = computed(() => {
  if (auth.user && auth.user.name) {
    return auth.user.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }
  // Si no tiene nombre, usar primeras letras del email
  if (auth.token) {
    const email = decodeEmailFromToken(auth.token)
    return email.substring(0, 2).toUpperCase()
  }
  return '?'
})

function decodeEmailFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.email || ''
  } catch {
    return ''
  }
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
