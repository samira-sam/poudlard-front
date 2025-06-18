/*import { defineStore } from 'pinia';
import axios from 'axios';
import { Professeur, ProfesseurProfil, ElevePourProfesseur, NoteData } from '../types';
import { useAuthStore } from './auth';

export const useProfesseurStore = defineStore('professeur', {
  state: () => ({
    // --- Intranet professeur connecté ---
    professeurProfil: null as ProfesseurProfil | null,
    elevesDuProfesseur: [] as ElevePourProfesseur[],
    
    // --- Page publique des professeurs ---
    allProfesseurs: [] as Professeur[],
    currentProfesseur: null as Professeur | null,

    // --- État général ---
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    // ----------- FONCTIONNALITÉS INTRANET PROFESSEUR ------------

    async fetchProfesseurProfile() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return;
      }

      try {
        const response = await axios.get<ProfesseurProfil>('http://localhost:3033/api/professeur/profil', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.professeurProfil = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du profil du professeur.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchElevesDuProfesseur() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return;
      }

      try {
        const response = await axios.get<ElevePourProfesseur[]>('http://localhost:3033/api/professeur/mes-eleves', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.elevesDuProfesseur = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération des élèves du professeur.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
      } finally {
        this.isLoading = false;
      }
    },

    async attribuerNote(noteData: NoteData): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return false;
      }

      try {
        await axios.post('http://localhost:3033/api/professeur/note', noteData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors de l'attribution de la note.";
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfesseurProfile(updateData: Partial<ProfesseurProfil>): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return false;
      }

      try {
        const response = await axios.put('http://localhost:3033/api/professeur/profil', updateData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        this.professeurProfil = response.data.profil;
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la mise à jour du profil.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    resetStore() {
      this.professeurProfil = null;
      this.elevesDuProfesseur = [];
      this.allProfesseurs = [];
      this.currentProfesseur = null;
      this.isLoading = false;
      this.error = null;
    },

    // ----------- FONCTIONNALITÉS PAGE PUBLIQUE PROFESSEURS ------------

    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get<Professeur[]>('http://localhost:3033/professeurs');
        this.allProfesseurs = response.data;
      } catch (err: any) {
        this.error = 'Erreur lors de la récupération de tous les professeurs.';
        console.error(this.error, err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchById(id: number) {
      this.isLoading = true;
      this.error = null;
      this.currentProfesseur = null;
      try {
        const response = await axios.get<Professeur>(`http://localhost:3033/professeurs/${id}`);
        this.currentProfesseur = response.data;
      } catch (err: any) {
        this.error = `Erreur lors de la récupération du professeur ${id}.`;
        console.error(this.error, err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
*/

import { defineStore } from 'pinia';
import axios from 'axios';
import { Professeur, ProfesseurProfil, ElevePourProfesseur, NoteData } from '../types';
import { useAuthStore } from './auth';

export const useProfesseurStore = defineStore('professeur', {
  state: () => ({
    // --- Intranet professeur connecté ---
    professeurProfil: null as ProfesseurProfil | null,
    elevesDuProfesseur: [] as ElevePourProfesseur[],
    
    // --- Page publique des professeurs ---
    allProfesseurs: [] as Professeur[],
    currentProfesseur: null as Professeur | null,

    // --- État général ---
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    // ----------- FONCTIONNALITÉS INTRANET PROFESSEUR ------------

    async fetchProfesseurProfile() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return;
      }

      try {
        const response = await axios.get<ProfesseurProfil>('http://localhost:3033/api/professeur/profil', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.professeurProfil = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du profil du professeur.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchElevesDuProfesseur() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return;
      }

      try {
        const response = await axios.get<ElevePourProfesseur[]>('http://localhost:3033/api/professeur/mes-eleves', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.elevesDuProfesseur = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération des élèves du professeur.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
      } finally {
        this.isLoading = false;
      }
    },

    async attribuerNote(noteData: NoteData): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return false;
      }

      try {
        await axios.post('http://localhost:3033/api/professeur/note', noteData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors de l'attribution de la note.";
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfesseurProfile(updateData: Partial<ProfesseurProfil>): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout();
        return false;
      }

      try {
        const response = await axios.put('http://localhost:3033/api/professeur/profil', updateData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        this.professeurProfil = response.data.profil;
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la mise à jour du profil.';
        if (err.response?.status === 401 || err.response?.status === 403) authStore.logout();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    resetStore() {
      this.professeurProfil = null;
      this.elevesDuProfesseur = [];
      this.allProfesseurs = [];
      this.currentProfesseur = null;
      this.isLoading = false;
      this.error = null;
    },

    // ----------- FONCTIONNALITÉS PAGE PUBLIQUE PROFESSEURS ------------

    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get<Professeur[]>('http://localhost:3033/api/professeurs');
        this.allProfesseurs = response.data;
      } catch (err: any) {
        this.error = 'Erreur lors de la récupération de tous les professeurs.';
        console.error(this.error, err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchById(id: number) {
      this.isLoading = true;
      this.error = null;
      this.currentProfesseur = null;
      try {
        const response = await axios.get<Professeur>(`http://localhost:3033/api/professeurs/${id}`);
        this.currentProfesseur = response.data;
      } catch (err: any) {
        this.error = `Erreur lors de la récupération du professeur ${id}.`;
        console.error(this.error, err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
