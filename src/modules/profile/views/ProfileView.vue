<template>
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Mi Perfil</v-card-title>
          <v-card-text>
            <p><strong>Email:</strong> {{ userEmail }}</p>
            <p><strong>Rol:</strong> {{ auth.role }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuth } from '@/modules/auth/stores/useAuth'
import { computed } from 'vue'

const auth = useAuth()

const userEmail = computed(() => {
  if (auth.token) {
    try {
      const payload = JSON.parse(atob(auth.token.split('.')[1]))
      return payload.email || ''
    } catch {
      return ''
    }
  }
  return ''
})
</script>
