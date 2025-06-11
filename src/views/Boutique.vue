<template>
  <div class="boutique-page max-w-7xl mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-10 text-red-700">Poudlard Shop</h1>

    <div v-if="articleStore.loading" class="text-center text-gray-500 text-lg">Chargement des articles...</div>
    <div v-else-if="articleStore.error" class="text-center text-red-600 text-lg">Erreur lors du chargement : {{ articleStore.error.message }}</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div v-for="article in articleStore.allArticles" :key="article.id_article"
             class="border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col">
          
          <div class="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100"> 
            <img v-if="article.photo"
                 :src="getImageUrl(article.photo)"
                 :alt="article.nom"
                 class="w-full h-full object-contain" /> <div v-else
                 class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
              Pas d'image
            </div>
          </div>

          <hr class="border-t border-gray-300 my-0" />

          <div class="p-3 flex-grow flex flex-col justify-between">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 text-center mb-1 leading-tight">
              {{ article.nom }}
            </h3> <p class="text-xl font-bold text-gray-900 text-center">{{ article.prix }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useArticleStore } from '../stores/ArticleStore';
const articleStore = useArticleStore();

const getImageUrl = (photoPath: string) => {
  return photoPath ? photoPath : ''; 
};

onMounted(async () => {
  await articleStore.fetchAllArticles();
});
</script>

<style scoped>
/* Aucun style spécifique nécessaire ici pour ces ajustements Tailwind. */
</style>