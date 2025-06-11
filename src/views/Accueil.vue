<template>
  <!-- Phrase de bienvenue -->
  <div class="mt-5 px-5 text-center text-gray-800 font-cinzel">
    <p class="text-3xl font-semibold mb-4">
      Bienvenue sur le site de Poudlard !
    </p>
    <p class="text-lg sm:text-2xl leading-relaxed">
      Vous trouverez ici toutes les informations concernant les cours, les maisons, la boutique et votre espace personnel ✨.
    </p>
  </div>

  <!-- Bloc principal ajustable -->
  <div class="mt-10 ml-[140px] pr-5 text-gray-800"> <!-- Ajuste ici le ml-[20px] -->

    <!-- Bloc rentrée -->
    <div class="mt-10 text-left" v-if="rentree">
      <h2 class="text-2xl font-bold mb-2 underline" >
        La prochaine rentrée se déroulera le {{ formatDate(rentree.date) }}
      </h2>
      <p class="mt-2">{{ rentree.info }}</p>
    </div>

    <!-- Bloc vacances -->
    <div class="mt-10 text-left" v-if="vacances.length">
      <h2 class="text-2xl font-bold mb-2 underline">Les périodes de vacances :</h2>
      <ul class="pl-5">
        <li v-for="vac in vacances" :key="vac.id_vacances">
          {{ vac.info }} : du <strong>{{ formatDate(vac.date_debut) }}</strong> au
          <strong>{{ formatDate(vac.date_fin) }}</strong>.
        </li>
      </ul>
    </div>

    <!-- Bloc BUSE -->
    <div class="mt-10 text-left" v-if="buse">
      <h2 class="text-2xl font-bold mb-1 underline">B.U.S.E.S</h2>
      <p class="text-sm mb-2 pl-5">{{ formatDate(buse.date) }}</p>
      <p class="pl-5">{{ buse.info }}</p>
    </div>

    <!-- Bloc concours -->
    <div class="mt-10 text-left " v-if="concours.length">
      <h2 class="text-2xl font-bold mb-2 underline">Les concours :</h2>
      <p class="mb-4">
        Pour les élèves de 7e année, les concours d'admission auront lieu aux dates suivantes :
      </p>
      <ul class="list-disc pl-5">
        <li v-for="concoursItem in concours" :key="concoursItem.id_concours">
          {{ concoursItem.info }} :
          <strong>{{ formatDate(concoursItem.date_debut) }}</strong>
          <p v-if="concoursItem.date_fin">
            au <strong>{{ formatDate(concoursItem.date_fin) }}</strong>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/services/axios';
import { getConcoursByAnnee } from '@/services/concours';

interface Rentree {
id_rentree: number;
date: string;
info: string;
}

interface Vacance {
id_vacances: number;
info: string;
date_debut: string;
date_fin: string;
}

interface Buse {
id_buse: number;
info: string;
date: string;
}

interface Concours {
id_concours: number;
nom?: string;
info: string;
date_debut: string;
date_fin?: string | null;
}

const rentree = ref<Rentree | null>(null);
const vacances = ref<Vacance[]>([]);
const buse = ref<Buse | null>(null);
const concours = ref<Concours[]>([]);

const formatDate = (isoDate: string): string => {
return new Intl.DateTimeFormat('fr-FR', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(new Date(isoDate));
};

onMounted(async () => {
try {
const rentreeResponse = await axios.get('/rentrees/latest');
rentree.value = rentreeResponse.data || null;

const vacancesResponse = await axios.get('/vacances');
if (Array.isArray(vacancesResponse.data)) {
vacances.value = vacancesResponse.data;
}

const resBuse = await axios.get('/buses/latest');
buse.value = resBuse.data;
} catch (error) {
console.error('Erreur lors du chargement des données', error);
}

try {
const response = await getConcoursByAnnee(7);
concours.value = response.data;
} catch (error) {
console.error('Erreur lors de la récupération des concours :', error);
}
});
</script>

<style scoped>
.font-cinzel {
font-family: 'Cinzel', serif;
}
</style>

