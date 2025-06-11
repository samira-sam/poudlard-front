<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
    <h2 class="text-xl font-bold mb-4">Inscription</h2>
    <form @submit.prevent="handleRegister">
      <input
        v-model="form.nom"
        type="text"
        placeholder="Nom"
        class="input"
        required
      />
      <input
        v-model="form.prenom"
        type="text"
        placeholder="Prénom"
        class="input"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="input"
        required
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Mot de passe"
        class="input"
        required
        minlength="6"
      />
      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        class="input"
        required
        minlength="6"
      />
     
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? 'Inscription...' : "S'inscrire" }}
      </button>
 <div class="max-w-md mx-auto mt-10  ">
      <router-link to="/connexion" class="text-blue-600 hover:underline">
  <p>Déjà inscrit ? Connectez-vous ici</p>
</router-link>
</div>

    </form>

    <p v-if="authStore.message" class="mt-4 text-green-600">{{ authStore.message }}</p>
    <p v-if="authStore.error" class="mt-4 text-red-600">{{ authStore.error }}</p>
  </div>
 

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const handleRegister = async () => {
  authStore.error = ''
  authStore.message = ''

  if (form.value.password !== form.value.confirmPassword) {
    authStore.error = 'Les mots de passe ne correspondent pas.'
    return
  }

  loading.value = true

  await authStore.register({
    nom: form.value.nom,
    prenom: form.value.prenom,
    email: form.value.email,
    mot_de_passe: form.value.password // ⚠️ Correspond à ce que le backend attend
  })

  loading.value = false
}
</script>

<style scoped>
.input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>
