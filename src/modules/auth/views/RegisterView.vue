<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row class="w-100" justify="center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card class="pa-6" max-width="480" width="100%">
          <v-card-title class="text-h5">Registrarse</v-card-title>

          <v-form @submit.prevent="handleRegister" v-model="formValid">
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              class="mb-4"
            >
              {{ errorMessage }}
            </v-alert>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              required
            />
            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              :rules="[rules.required, rules.min]"
              required
            />

            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading"
              :disabled="!formValid || loading"
            >
              Registrarse
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/modules/auth/stores/useAuth'

const email = ref('')
const password = ref('')
const formValid = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const auth = useAuth()

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  email: v => /.+@.+\..+/.test(v) || 'Debe ser un email válido',
  min: v => v.length >= 6 || 'Mínimo 6 caracteres',
}

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    await axios.post('http://localhost:8081/register', {
      email: email.value,
      password: password.value,
    })

    const ok = await auth.login(email.value, password.value)
    if (ok) {
      router.push('/dashboard')
    }
  } catch (err) {
    if (err.response?.data?.error) {
      errorMessage.value = err.response.data.error
    } else {
      errorMessage.value = 'Error al registrar. Intentá de nuevo.'
    }
  } finally {
    loading.value = false
  }
}
</script>
