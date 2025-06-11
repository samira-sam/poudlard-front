<template>
  <nav class="bg-gradient-to-r from-purple-950 via-purple-800 to-purple-800 shadow-md">
    <div class="w-full px-[30px]">
      <div class="flex items-center justify-between">
        <!-- Logo aligné à gauche -->
        <div class="flex-1 flex items-center mt-2 mb-2">
          <img src="/src/assets/logo.png" alt="Logo" class="h-12 sm:h-16 md:h-20 lg:h-24" />
        </div>

        <!-- Menu principal aligné à droite -->
        <div class="hidden md:flex space-x-6 text-white text-lg font-cinzel justify-end">
          <RouterLink to="/" class="hover:text-blue-600">Accueil</RouterLink>
          <RouterLink to="/boutique" class="hover:text-blue-600">Boutique</RouterLink>

          <!-- Sous-menu École -->
          <div
            class="relative"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <button class="hover:text-blue-600">École</button>
            <transition name="fade">
              <div
                v-if="showDropdown"
                class="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2 z-50"
              >
                <RouterLink to="/matieres" class="block px-4 py-2 bg-white hover:bg-purple-700 hover:bg-opacity-70">Cours</RouterLink>
                <RouterLink to="/maisons" class="block px-4 py-2 hover:bg-gray-100">Maison</RouterLink>
                <RouterLink to="/professeurs" class="block px-4 py-2 hover:bg-gray-100">Professeur</RouterLink>
              </div>
            </transition>
          </div>

          <RouterLink to="/intranet-eleve" class="hover:text-blue-600">Intranet</RouterLink>
          <RouterLink to="/inscription" class="hover:text-blue-600">Connexion / Inscription</RouterLink>
        </div>

        <!-- Menu burger (mobile) -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
      <div v-if="isOpen" class="md:hidden mt-4 space-y-2 text-white font-cinzel">
        <RouterLink to="/" class="block hover:text-blue-600">Accueil</RouterLink>
        <RouterLink to="/boutique" class="block hover:text-blue-600">Boutique</RouterLink>

        <details class="block">
          <summary class="cursor-pointer hover:text-blue-600">École</summary>
          <div class="ml-4 space-y-1">
            <RouterLink to="/matiere" class="block hover:text-blue-600">Cours</RouterLink>
            <RouterLink to="/maison" class="block hover:text-blue-600">Maison</RouterLink>
            <RouterLink to="/professeur" class="block hover:text-blue-600">Professeur</RouterLink>
          </div>
        </details>

        <RouterLink to="/intranet" class="block hover:text-blue-600">Intranet</RouterLink>
        <RouterLink to="/connexion" class="block hover:text-blue-600">Connexion / Inscription</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const showDropdown = ref(false)
</script>

<style scoped>
.font-cinzel {
  font-family: 'Cinzel', serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
