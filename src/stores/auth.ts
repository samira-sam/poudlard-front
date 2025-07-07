/*
import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Import des interfaces nécessaires
import { Utilisateur, Role } from '../types';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as Utilisateur | null,
    token: localStorage.getItem('token') || '',
    error: '',
    message: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserRole: (state) => state.user?.role?.name || '',
    isAdmin: (state) => state.user?.role?.name === 'admin',
    isEleve: (state) => state.user?.role?.name === 'eleve',
    isProfesseur: (state) => state.user?.role?.name === 'professeur',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        this.message = '';
        // withCredentials true pour envoyer cookie httpOnly côté admin
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe }, { withCredentials: true });

        this.token = response.data.token;
        this.user = response.data.utilisateur as Utilisateur;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        this.message = 'Connexion réussie !';
        setTimeout(() => { this.message = ''; }, 3000);

        // En-tête Authorization pour API internes
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        // Redirection selon rôle
        if (this.user && this.user.role) {
          switch (this.user.role.name) {
            case 'eleve':
              router.push('/intranet-eleve');
              break;
            case 'professeur':
              router.push('/intranet-professeur');
              break;
            case 'admin':
              // Rechargement complet vers admin pour cookie httpOnly
              window.location.href = 'http://localhost:3033/admin';
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
        this.logout();
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        await axios.post('http://localhost:3033/auth/register', data, { withCredentials: true });
        this.message = "Inscription réussie ! un email d'activation vous sera envoyé prochainement'.";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription.";
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //this.message = '';
      //this.error = '';
      delete axios.defaults.headers.common['Authorization'];
      router.push('/connexion');
    },

    async loadUserFromToken() {
      if (this.token && !this.user) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          // withCredentials pour envoyer cookie httpOnly si admin
          const response = await axios.get('http://localhost:3033/auth/me', { withCredentials: true });
          this.user = response.data as Utilisateur;
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          if (err.response?.status === 401 || err.response?.status === 403) {
            this.logout();
          }
        }
      } else if (!this.token) {
        this.user = null;
        localStorage.removeItem('user');
      }
    }
  }
});
*/




/*
import { defineStore } from 'pinia';
import axios from 'axios';
import { Utilisateur, Role } from '../types';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as Utilisateur | null, // Initialiser à null, sera chargé par loadUserFromToken
    token: localStorage.getItem('token') || '', // Le token est là, mais son authenticité n'est pas encore validée
    error: '',
    message: ''
  }),
  getters: {
    // isAuthenticated doit être basé sur la présence d'un user validé ET d'un token
    isAuthenticated: (state) => !!state.user && !!state.token,
    getUserRole: (state) => state.user?.role?.name || '',
    isAdmin: (state) => state.user?.role?.name === 'admin',
    isEleve: (state) => state.user?.role?.name === 'eleve',
    isProfesseur: (state) => state.user?.role?.name === 'professeur',
  },
  actions: {
    async login(email: string, mot_de_passe: string) {
      try {
        this.error = '';
        this.message = '';
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe }, { withCredentials: true });

        this.token = response.data.token;
        this.user = response.data.utilisateur as Utilisateur; // L'utilisateur est validé par la connexion

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user)); // Sauvegarder l'utilisateur validé

        this.message = 'Connexion réussie !';
        setTimeout(() => { this.message = ''; }, 3000);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        if (this.user && this.user.role) {
          switch (this.user.role.name) {
            case 'eleve':
              router.push('/intranet-eleve');
              break;
            case 'professeur':
              router.push('/intranet-professeur');
              break;
            case 'admin':
              window.location.href = 'http://localhost:3033/admin';
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
        this.logout(); // En cas d'échec de connexion, s'assurer que tout est nettoyé
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.error = '';
      this.message = '';
      try {
        await axios.post('http://localhost:3033/auth/register', data, { withCredentials: true });
        this.message = "Inscription réussie ! Un email d'activation vous sera envoyé prochainement.";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription.";
      }
    },

    logout() {
      this.token = '';
      this.user = null; // IMPORTANT : Réinitialiser l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/connexion');
    },

    async loadUserFromToken() {
        // Si un token est présent dans localStorage, et que user n'est pas encore défini
        // OU si le user est défini mais le token n'est pas là (incohérence à corriger)
      if (this.token && !this.user) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          const response = await axios.get('http://localhost:3033/auth/me', { withCredentials: true });
          this.user = response.data as Utilisateur; // L'utilisateur est validé par l'API
          localStorage.setItem('user', JSON.stringify(this.user)); // Mettre à jour localStorage
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          // Si le token est invalide ou expiré (status 401/403), déconnecter
          if (err.response?.status === 401 || err.response?.status === 403) {
            this.logout();
          }
        }
      } else if (!this.token && this.user) {
          // Cas où un user est en localStorage mais sans token, il faut nettoyer
          this.logout();
      } else if (!this.token && !this.user) {
          // Aucun token, aucun user : déjà en état déconnecté, rien à faire
          // S'assurer que user est bien null et localStorage est propre
          this.user = null;
          localStorage.removeItem('user');
      }
    }
  }
});*/


/*import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Import des interfaces nécessaires (assure-toi que Utilisateur inclut les champs pour le token de reset)
import { Utilisateur, Role } from '../types';
import router from '../router';

// ⭐ Ajout de isLoading et clearMessages pour une meilleure gestion de l'UI ⭐
interface AuthState {
  user: Utilisateur | null;
  token: string;
  error: string;
  message: string;
  isLoading: boolean; // Ajout pour gérer l'état de chargement des requêtes
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ // Spécifier le type du state
    user: JSON.parse(localStorage.getItem('user') || 'null') as Utilisateur | null,
    token: localStorage.getItem('token') || '',
    error: '',
    message: '',
    isLoading: false, // Initialiser à false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    getUserRole: (state) => state.user?.role?.name || '',
    isAdmin: (state) => state.user?.role?.name === 'admin',
    isEleve: (state) => state.user?.role?.name === 'eleve',
    isProfesseur: (state) => state.user?.role?.name === 'professeur',
  },
  actions: {
    // Méthode utilitaire pour nettoyer les messages
    clearMessages() {
      this.error = '';
      this.message = '';
    },

    async login(email: string, mot_de_passe: string) {
      this.isLoading = true; // Début du chargement
      this.clearMessages(); // Nettoyer les messages avant la requête
      try {
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe }, { withCredentials: true });

        this.token = response.data.token;
        this.user = response.data.utilisateur as Utilisateur;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        this.message = 'Connexion réussie !';
        setTimeout(() => { this.message = ''; }, 3000);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        if (this.user && this.user.role) {
          switch (this.user.role.name) {
            case 'eleve':
              router.push('/intranet-eleve');
              break;
            case 'professeur':
              router.push('/intranet-professeur');
              break;
            case 'admin':
              window.location.href = 'http://localhost:3033/admin';
              break;
            default:
              router.push('/');
          }
        } else {
          router.push('/connexion');
        }

      } catch (err: any) {
        this.clearMessages(); // Nettoyer les messages d'avant
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
        this.logout();
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.isLoading = true; // Début du chargement
      this.clearMessages(); // Nettoyer les messages avant la requête
      try {
        await axios.post('http://localhost:3033/auth/register', data, { withCredentials: true });
        this.message = "Inscription réussie ! Un email d'activation vous sera envoyé prochainement.";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription.";
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.clearMessages(); // S'assurer que les messages sont nettoyés à la déconnexion
      delete axios.defaults.headers.common['Authorization'];
      router.push('/connexion');
    },

    async loadUserFromToken() {
      // Si un token est présent dans localStorage, et que user n'est pas encore défini
      // OU si le user est défini mais le token n'est pas là (incohérence à corriger)
      if (this.token && !this.user) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          const response = await axios.get('http://localhost:3033/auth/me', { withCredentials: true });
          this.user = response.data as Utilisateur; // L'utilisateur est validé par l'API
          localStorage.setItem('user', JSON.stringify(this.user)); // Mettre à jour localStorage
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          // Si le token est invalide ou expiré (status 401/403), déconnecter
          if (err.response?.status === 401 || err.response?.status === 403) {
            this.logout();
          }
        }
      } else if (!this.token && this.user) {
          // Cas où un user est en localStorage mais sans token, il faut nettoyer
          this.logout();
      } else if (!this.token && !this.user) {
          // Aucun token, aucun user : déjà en état déconnecté, rien à faire
          // S'assurer que user est bien null et localStorage est propre
          this.user = null;
          localStorage.removeItem('user');
      }
    },

    // --- NOUVELLES ACTIONS POUR LE MOT DE PASSE OUBLIÉ ---

    async requestPasswordReset(email: string): Promise<boolean> {
      this.isLoading = true;
      this.clearMessages();
      try {
        const response = await axios.post('http://localhost:3033/auth/request-password-reset', { email });
        this.message = response.data.message || 'Un e-mail de réinitialisation a été envoyé si l\'adresse existe.';
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la demande de réinitialisation.';
        console.error("Erreur requestPasswordReset:", err);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async resetPassword(token: string, newPassword: string): Promise<boolean> {
      this.isLoading = true;
      this.clearMessages();
      try {
        // Envoie le token dans l'URL et le nouveau mot de passe dans le corps
        const response = await axios.post(`http://localhost:3033/auth/reset-password/${token}`, { newPassword });
        this.message = response.data.message || 'Votre mot de passe a été réinitialisé avec succès.';
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe.';
        console.error("Erreur resetPassword:", err);
        // Important : propager l'erreur pour que le composant puisse gérer la redirection
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  }
});

*/


import { defineStore } from 'pinia';
import axios from 'axios';
// ⭐ Import des interfaces nécessaires (assure-toi que Utilisateur inclut les champs pour le token de reset)
import { Utilisateur, Role } from '../types';
import router from '../router';

// ⭐ Ajout de isLoading et clearMessages pour une meilleure gestion de l'UI ⭐
interface AuthState {
  user: Utilisateur | null;
  token: string;
  error: string;
  message: string;
  isLoading: boolean; // Ajout pour gérer l'état de chargement des requêtes
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({ // Spécifier le type du state
    user: JSON.parse(localStorage.getItem('user') || 'null') as Utilisateur | null,
    token: localStorage.getItem('token') || '',
    error: '',
    message: '',
    isLoading: false, // Initialiser à false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    getUserRole: (state) => state.user?.role?.name || '',
    isAdmin: (state) => state.user?.role?.name === 'admin',
    isEleve: (state) => state.user?.role?.name === 'eleve',
    isProfesseur: (state) => state.user?.role?.name === 'professeur',
  },
  actions: {
    // Méthode utilitaire pour nettoyer les messages
    clearMessages() {
      this.error = '';
      this.message = '';
    },

    async login(email: string, mot_de_passe: string) {
      this.isLoading = true; // Début du chargement
      this.clearMessages(); // Nettoyer les messages avant la requête
      try {
        const response = await axios.post('http://localhost:3033/auth/login', { email, mot_de_passe }, { withCredentials: true });

        this.token = response.data.token;
        this.user = response.data.utilisateur as Utilisateur;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        this.message = 'Connexion réussie !';
        setTimeout(() => { this.message = ''; }, 3000);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        if (this.user && this.user.role) {
          switch (this.user.role.name) {
            case 'eleve':
              router.push('/intranet-eleve');
              break;
            case 'professeur':
              router.push('/intranet-professeur');
              break;
            case 'admin':
              window.location.href = 'http://localhost:3033/admin';
              break;
            default:
              router.push('/');
          }
        } else {
          router.push('/connexion');
        }

      } catch (err: any) {
        this.clearMessages(); // Nettoyer les messages d'avant
        this.error = err.response?.data?.error || 'Erreur lors de la connexion.';
        this.logout();
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    async register(data: { nom: string; prenom: string; email: string; mot_de_passe: string }) {
      this.isLoading = true; // Début du chargement
      this.clearMessages(); // Nettoyer les messages avant la requête
      try {
        await axios.post('http://localhost:3033/auth/register', data, { withCredentials: true });
        this.message = "Inscription réussie ! Un email d'activation vous sera envoyé prochainement.";
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erreur lors de l'inscription.";
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.clearMessages(); // S'assurer que les messages sont nettoyés à la déconnexion
      delete axios.defaults.headers.common['Authorization'];
      router.push('/connexion');
    },

    async loadUserFromToken() {
      // Si un token est présent dans localStorage, et que user n'est pas encore défini
      // OU si le user est défini mais le token n'est pas là (incohérence à corriger)
      if (this.token && !this.user) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          const response = await axios.get('http://localhost:3033/auth/me', { withCredentials: true });
          this.user = response.data as Utilisateur; // L'utilisateur est validé par l'API
          localStorage.setItem('user', JSON.stringify(this.user)); // Mettre à jour localStorage
          console.log("Utilisateur rechargé depuis le token:", this.user);
        } catch (err: any) {
          console.error("Erreur lors du rechargement de l'utilisateur depuis le token:", err);
          // Si le token est invalide ou expiré (status 401/403), déconnecter
          if (err.response?.status === 401 || err.response?.status === 403) {
            this.logout();
          }
        }
      } else if (!this.token && this.user) {
          // Cas où un user est en localStorage mais sans token, il faut nettoyer
          this.logout();
      } else if (!this.token && !this.user) {
          // Aucun token, aucun user : déjà en état déconnecté, rien à faire
          // S'assurer que user est bien null et localStorage est propre
          this.user = null;
          localStorage.removeItem('user');
      }
    },

    // --- ACTIONS POUR LE MOT DE PASSE OUBLIÉ (flux par e-mail) ---

    async requestPasswordReset(email: string): Promise<boolean> {
      this.isLoading = true;
      this.clearMessages();
      try {
        const response = await axios.post('http://localhost:3033/auth/request-password-reset', { email });
        // ⭐ MODIFICATION ICI : Le message vient du backend. Le frontend n'a pas le token. ⭐
        // Le backend renvoie déjà un message générique pour la sécurité (qu'il ait trouvé l'email ou non).
        this.message = response.data.message || 'La demande a été traitée.';
        return true; // Indique que la demande a été soumise au backend
      } catch (err: any) {
        // Le backend renvoie un message sécurisé (200 OK) même en cas d'email non trouvé.
        // Donc, la plupart des erreurs ici seraient des erreurs serveur 500.
        this.error = err.response?.data?.message || 'Erreur lors de la demande de réinitialisation.';
        console.error("Erreur requestPasswordReset:", err);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async resetPassword(token: string, newPassword: string): Promise<boolean> {
      this.isLoading = true;
      this.clearMessages();
      try {
        // Envoie le token dans l'URL (via la route) et le nouveau mot de passe dans le corps
        const response = await axios.post(`http://localhost:3033/auth/reset-password/${token}`, { newPassword });
        this.message = response.data.message || 'Votre mot de passe a été réinitialisé avec succès.';
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe.';
        console.error("Erreur resetPassword:", err);
        // Important : propager l'erreur pour que le composant puisse gérer la redirection
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  }
});
