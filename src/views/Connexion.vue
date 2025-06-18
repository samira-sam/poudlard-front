<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Connexion</h2>
    
    <form @submit.prevent="onSubmit">
      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email :</label>
        <input
          id="email"
          type="email"
          v-model="emailValue"
          @blur="emailBlur"
          placeholder="Entrez votre email"
          class="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500 ring-red-500': emailError }"
          aria-describedby="email-error"
        />
        <p v-if="emailError" class="text-red-600 text-sm mt-1" id="email-error">{{ emailError }}</p>
      </div>

      <!-- Mot de passe -->
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Mot de passe :</label>
        <input
          id="password"
          type="password"
          v-model="passwordValue"
          @blur="passwordBlur"
          placeholder="Entrez votre mot de passe"
          class="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
          :class="{ 'border-red-500 ring-red-500': passwordError }"
          aria-describedby="password-error"
        />
        <p v-if="passwordError" class="text-red-600 text-sm mt-1" id="password-error">{{ passwordError }}</p>
      </div>

      <!-- Bouton -->
      <button 
        type="submit" 
        class="w-full bg-purple-900 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        :disabled="loading"
      >
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>

    <p v-if="authStore.message" class="mt-4 text-green-600 text-center">{{ authStore.message }}</p>
    <p v-if="authStore.error" class="mt-4 text-red-600 text-center">{{ authStore.error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const validationSchema = toTypedSchema(
  z.object({
    email: z.string()
      .min(1, 'L\'adresse email est requise.')
      .email('Veuillez entrer une adresse email valide.'),
    password: z.string()
      .min(1, 'Le mot de passe est requis.')
      .min(2, 'Le mot de passe doit contenir au moins 8 caractères.')
      /*.regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule.')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>).')*/,
  })
);

const { handleSubmit } = useForm({ validationSchema });

// Champs email
const {
  value: emailValue,
  errorMessage: emailError,
  handleBlur: emailBlur
} = useField('email');

// Champs password
const {
  value: passwordValue,
  errorMessage: passwordError,
  handleBlur: passwordBlur
} = useField('password');

// Chargement
const loading = ref(false);

// Soumission
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  authStore.error = '';
  try {
    await authStore.login(values.email, values.password);
  } catch (error) {
    console.error('Erreur lors de la connexion API:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Tu peux ajouter des styles ici si nécessaire */
</style>
