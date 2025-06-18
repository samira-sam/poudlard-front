<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
    <h2 class="text-xl font-bold mb-6 text-center text-purple-700">Inscription</h2>

    <Form :validation-schema="schema" @submit="handleRegister">
      <div class="space-y-4">
        <div>
          <Field
            name="nom"
            type="text"
            placeholder="Nom"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-900"
          />
          <ErrorMessage name="nom" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <Field
            name="prenom"
            type="text"
            placeholder="Prénom"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purpl900"
          />
          <ErrorMessage name="prenom" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purpl900"
          />
          <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purpl900"
          />
          <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purpl900"
          />
          <ErrorMessage name="confirmPassword" class="text-red-600 text-sm mt-1" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition disabled:opacity-50"
        >
          {{ loading ? 'Inscription...' : "S'inscrire" }}
        </button>
      </div>
    </Form>

    <div class="mt-6 text-center">
      <router-link to="/connexion" class="text-purple-800 hover:underline">
        <p>Déjà inscrit ? Connectez-vous ici</p>
      </router-link>
    </div>

    <p v-if="authStore.message" class="mt-4 text-purple-900">{{ authStore.message }}</p>
    <p v-if="authStore.error" class="mt-4 text-red-600">{{ authStore.error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const authStore = useAuthStore()
const loading = ref(false)

// Schéma Zod
const schema = toTypedSchema(
  z.object({
    nom: z.string().min(1, 'Le nom est requis'),
    prenom: z.string().min(1, 'Le prénom est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string().min(6, 'Confirmation requise'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })
)

// Soumission du formulaire
const handleRegister = async (values: any) => {
  authStore.error = ''
  authStore.message = ''
  loading.value = true

  await authStore.register({
    nom: values.nom,
    prenom: values.prenom,
    email: values.email,
    mot_de_passe: values.password
  })

  loading.value = false
}
</script>
