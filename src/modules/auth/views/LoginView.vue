<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row class="w-100" justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card class="pa-6" max-width="480" width="100%">
          <v-card-title class="text-h5">Ingresar</v-card-title>

          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Contraseña" type="password" required />
            <v-btn type="submit" color="primary" block>Entrar</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/stores/useAuth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuth()

onMounted(() => {
  if (auth.isAuthenticated()) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
  const ok = await auth.login(email.value, password.value)
  if (ok) {
    router.push('/dashboard')
  }
}
</script>
