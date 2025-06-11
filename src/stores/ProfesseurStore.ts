// frontend/src/stores/ProfesseurStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
// On importe les interfaces nécessaires depuis le fichier de types centralisé
import { ProfesseurProfil, ElevePourProfesseur, NoteData } from '../types'; // Chemin corrigé
import { useAuthStore } from './auth'; // Pour récupérer le token et l'ID utilisateur

export const useProfesseurStore = defineStore('professeur', {
  state: () => ({
    // Renommé et typé pour le profil du professeur connecté
    professeurProfil: null as ProfesseurProfil | null,
    // Pour la liste des élèves que le professeur peut noter
    elevesDuProfesseur: [] as ElevePourProfesseur[],
    // Indique si une opération de chargement est en cours
    isLoading: false, // Renommé pour plus de clarté
    // Stocke une éventuelle erreur lors d'une requête API
    error: null as string | null, // Type string pour les messages d'erreur
  }),

  actions: {
    /**
     * Récupère le profil complet du professeur connecté.
     * Utilise le token d'authentification pour identifier le professeur.
     */
    async fetchProfesseurProfile() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore(); // Accès au store d'authentification

      if (!authStore.token) {
        this.error = "Token d'authentification manquant. Veuillez vous reconnecter.";
        this.isLoading = false;
        authStore.logout(); // Déconnecte l'utilisateur si pas de token
        return;
      }

      try {
        // L'URL correspond à la route que nous avons définie pour le profil du professeur connecté
        const response = await axios.get<ProfesseurProfil>('http://localhost:3033/api/professeur/profil', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.professeurProfil = response.data; // Stocke les données du profil dans l'état
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du profil du professeur.';
        console.error('Erreur fetchProfesseurProfile:', err);
        // Gérer la déconnexion si le token est invalide/expiré ou si le rôle n'est pas autorisé
        if (err.response?.status === 401 || err.response?.status === 403) {
          authStore.logout();
        }
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Récupère la liste des élèves qui suivent la matière enseignée par le professeur connecté.
     * Utilise le token d'authentification pour identifier le professeur.
     */
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
        // L'URL correspond à la route que nous avons définie pour les élèves du professeur
        const response = await axios.get<ElevePourProfesseur[]>('http://localhost:3033/api/professeur/mes-eleves', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.elevesDuProfesseur = response.data; // Stocke les élèves dans l'état
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération des élèves du professeur.';
        console.error('Erreur fetchElevesDuProfesseur:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          authStore.logout();
        }
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Enregistre une note pour un élève spécifique.
     * @param {NoteData} noteData - Les données de la note à attribuer (eleveId, matiereId, valeur, commentaire).
     * @returns {Promise<boolean>} True si l'attribution a réussi, false sinon.
     */
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
        // L'URL correspond à la route que nous avons définie pour noter un élève
        await axios.post('http://localhost:3033/api/professeur/note', noteData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        // Si la note est attribuée avec succès, tu peux déclencher un rafraîchissement des données si nécessaire.
        // Par exemple, si tu affiches des moyennes calculées dynamiquement.
        return true; // Indique le succès
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de l\'attribution de la note.';
        console.error('Erreur attribuerNote:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          authStore.logout();
        }
        return false; // Indique l'échec
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Met à jour le profil du professeur connecté.
     * @param {Partial<ProfesseurProfil>} updateData - Les données du profil à mettre à jour.
     * @returns {Promise<boolean>} True si la mise à jour a réussi, false sinon.
     */
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
        // L'URL correspond à la route que nous avons définie pour mettre à jour le profil du professeur
        const response = await axios.put('http://localhost:3033/api/professeur/profil', updateData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
        });
        // Met à jour le profil dans le store avec les données renvoyées par le backend
        this.professeurProfil = response.data.profil; // Rappel : le backend renvoie l'objet sous 'profil'
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la mise à jour du profil du professeur.';
        console.error('Erreur updateProfesseurProfile:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          authStore.logout();
        }
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Réinitialise l'état du store. Utile lors de la déconnexion ou d'une erreur critique.
     */
    resetStore() {
      this.professeurProfil = null;
      this.elevesDuProfesseur = [];
      this.isLoading = false;
      this.error = null;
    },
  },
});