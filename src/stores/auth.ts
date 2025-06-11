

/*//nouveaux code 3 juin 23h53
// frontend/auth/Authentification.ts

import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Importez les interfaces depuis votre fichier central de types ⭐
import { Utilisateur} from '../types'; // Le chemin d'accès peut varier selon l'arborescence exacte de votre projet

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as Utilisateur | null, // Le type 'user' est maintenant 'Utilisateur' importé
    token: localStorage.getItem('token') || '',
    error: '',
    message: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    // Accéder à la propriété 'name' de l'objet 'role' pour obtenir le nom du rôle
    getUserRole: (state) => state.user?.role?.name || '',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe });
        
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        
        // Le backend renvoie l'objet utilisateur sous la propriété 'utilisateur'
        // Nous le castons en Utilisateur pour correspondre à notre interface
        this.user = response.data.utilisateur as Utilisateur;

        this.message = 'Connexion réussie !';
      } catch (err: any) {
        this.message = '';
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
      }
    },

   async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        const response = await axios.post('http://localhost:3033/auth/register', data);
        this.message = "Inscription réussie";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription";
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      this.message = '';
      this.error = '';
    }
  }
});*/
// frontend/auth/Authentification.ts

/*import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Importez les interfaces depuis votre fichier central de types ⭐
import { Utilisateur } from '../types'; // Le chemin d'accès peut varier selon l'arborescence exacte de votre projet

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as Utilisateur | null, // Le type 'user' est maintenant 'Utilisateur' importé
    token: localStorage.getItem('token') || '', // Récupère le token au démarrage
    error: '',
    message: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    // Accéder à la propriété 'name' de l'objet 'role' pour obtenir le nom du rôle
    getUserRole: (state) => state.user?.role?.name || '',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe });
        
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        
        // Le backend renvoie l'objet utilisateur sous la propriété 'utilisateur'
        // Nous le castons en Utilisateur pour correspondre à notre interface
        this.user = response.data.utilisateur as Utilisateur;

        this.message = 'Connexion réussie !';

        // ⭐ Configure Axios pour envoyer le token par défaut dans les requêtes après connexion ⭐
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      } catch (err: any) {
        this.message = '';
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
        this.logout(); // S'assurer de nettoyer si la connexion échoue
      }
    },

   async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        const response = await axios.post('http://localhost:3033/auth/register', data);
        this.message = "Inscription réussie";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription";
      }
    },

    logout() {
      this.token = '';
      this.user = null; // Réinitialise l'utilisateur
      localStorage.removeItem('token');
      this.message = '';
      this.error = '';
      // ⭐ Supprime l'en-tête d'autorisation pour Axios au logout ⭐
      delete axios.defaults.headers.common['Authorization'];
    },

    // ⭐ NOUVELLE ACTION : Charger les détails de l'utilisateur à partir du token ⭐
    async loadUserFromToken() {
      // Si un token existe et que l'utilisateur n'est pas encore chargé
      if (this.token && !this.user) {
        try {
          // Configure l'en-tête d'autorisation pour la requête
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          // Fais une requête à ton backend pour récupérer les infos de l'utilisateur
          // Tu auras besoin d'une route sur ton backend qui renvoie les infos de l'utilisateur basé sur le token
          const response = await axios.get('http://localhost:3033/auth/me'); // Exemple: une route /auth/me
          this.user = response.data.utilisateur as Utilisateur; // Assure-toi que la réponse contient l'objet utilisateur
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          this.logout(); // Si le token est invalide ou expiré, déconnecte l'utilisateur
        }
      } else if (!this.token) {
        // Si aucun token n'existe, assure-toi que l'utilisateur est null
        this.user = null;
      }
    }
  }
});*/
/*
import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Importez les interfaces depuis votre fichier central de types ⭐
import { Utilisateur } from '../types'; // Le chemin d'accès peut varier selon l'arborescence exacte de votre projet

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as Utilisateur | null, // Le type 'user' est maintenant 'Utilisateur' importé
    token: localStorage.getItem('token') || '', // Récupère le token au démarrage
    error: '',
    message: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    // Accéder à la propriété 'name' de l'objet 'role' pour obtenir le nom du rôle
    getUserRole: (state) => state.user?.role?.name || '',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe });
        
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        
        // POUR L'ACTION LOGIN : Le backend renvoie l'objet utilisateur sous la propriété 'utilisateur'
        this.user = response.data.utilisateur as Utilisateur;

        this.message = 'Connexion réussie !';

        // Configure Axios pour envoyer le token par défaut dans les requêtes après connexion
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      } catch (err: any) {
        this.message = '';
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
        this.logout(); // S'assurer de nettoyer si la connexion échoue
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        const response = await axios.post('http://localhost:3033/auth/register', data);
        this.message = "Inscription réussie";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription";
      }
    },

    logout() {
      this.token = '';
      this.user = null; // Réinitialise l'utilisateur
      localStorage.removeItem('token');
      this.message = '';
      this.error = '';
      // Supprime l'en-tête d'autorisation pour Axios au logout
      delete axios.defaults.headers.common['Authorization'];
    },

    // ACTION : Charger les détails de l'utilisateur à partir du token
    async loadUserFromToken() {
      // Si un token existe et que l'utilisateur n'est pas encore chargé
      if (this.token && !this.user) {
        try {
          // Configure l'en-tête d'autorisation pour la requête
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          
          // Fais une requête à ton backend pour récupérer les infos de l'utilisateur
          const response = await axios.get('http://localhost:3033/auth/me');
          
          // ⭐ CORRECTION CLÉ ICI : La réponse de /auth/me est DIRECTEMENT l'objet utilisateur ⭐
          this.user = response.data as Utilisateur; // <-- Changé de 'response.data.utilisateur' à 'response.data'
          
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          this.logout(); // Si le token est invalide ou expiré, déconnecte l'utilisateur
        }
      } else if (!this.token) {
        // Si aucun token n'existe, assure-toi que l'utilisateur est null
        this.user = null;
      }
    }
  }
});*/

// frontend/auth/Authentification.ts

import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Importez les interfaces nécessaires depuis votre fichier central de types ⭐
import { Utilisateur, Role } from '../types'; // Chemin d'accès relatif à votre fichier central de types
import router from '../router'; // Assurez-vous que ce chemin est correct pour votre router Vue

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Initialise user depuis localStorage, pour persister le rôle et autres infos
    user: JSON.parse(localStorage.getItem('user') || 'null') as Utilisateur | null, 
    token: localStorage.getItem('token') || '', // Initialise token depuis localStorage
    error: '', // Pour les messages d'erreur de l'API
    message: '' // Pour les messages de succès
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserRole: (state) => state.user?.role?.name || '', // Garde ce getter générique

    // ⭐ GETTERS DE RÔLE SPÉCIFIQUES AJOUTÉS ⭐
    isAdmin: (state) => state.user?.role?.name === 'admin',
    isEleve: (state) => state.user?.role?.name === 'eleve',
    isProfesseur: (state) => state.user?.role?.name === 'professeur',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        this.message = ''; // Réinitialise les messages
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe });
        
        this.token = response.data.token;
        // ⭐ IMPORTANT : Persister l'objet utilisateur complet (y compris le rôle) ⭐
        this.user = response.data.utilisateur as Utilisateur; 
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user)); // Sauvegarde l'objet utilisateur

        this.message = 'Connexion réussie !';

        // Configure Axios pour envoyer le token par défaut dans les requêtes après connexion
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        // ⭐ LOGIQUE DE REDIRECTION APRÈS CONNEXION AJOUTÉE ⭐
        if (this.user && this.user.role) {
            switch (this.user.role.name) {
                case 'eleve':
                    router.push('/intranet-eleve');
                    break;
                case 'professeur':
                    router.push('/intranet-professeur');
                    break;
                case 'admin':
                    router.push('/intranet-admin'); 
                    break;
                default:
                    router.push('/'); 
            }
        } else {
            router.push('/connexion'); 
        }

      } catch (err: any) {
        this.message = '';
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
        this.logout(); // Toujours déconnecter et nettoyer si la connexion échoue
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        await axios.post('http://localhost:3033/auth/register', data);
        this.message = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription.";
      }
    },

    logout() {
      this.token = '';
      this.user = null; // Réinitialise l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // ⭐ Retire aussi l'objet user du localStorage AJOUTÉ ⭐
      this.message = '';
      this.error = '';
      // Supprime l'en-tête d'autorisation pour Axios au logout
      delete axios.defaults.headers.common['Authorization'];
      router.push('/connexion'); // ⭐ Redirige toujours vers la page de connexion après déconnexion AJOUTÉ ⭐
    },

    // ACTION : Charger les détails de l'utilisateur à partir du token au démarrage de l'application
    async loadUserFromToken() {
      if (this.token && !this.user) { 
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          const response = await axios.get('http://localhost:3033/auth/me');
          
          this.user = response.data as Utilisateur; 
          localStorage.setItem('user', JSON.stringify(this.user)); // ⭐ Sauvegarde pour la prochaine session AJOUTÉ ⭐
          
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          // ⭐ Déconnexion forcée si token invalide/expiré AJOUTÉ ⭐
          if (err.response?.status === 401 || err.response?.status === 403) {
            this.logout(); 
          }
        }
      } else if (!this.token) {
        this.user = null;
        localStorage.removeItem('user'); // ⭐ Nettoie au cas où AJOUTÉ ⭐
      }
    }
  }
});