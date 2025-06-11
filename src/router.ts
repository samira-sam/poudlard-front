/*import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./views/Accueil.vue');
const Matiere = () => import('./views/Matiere.vue');
const MatiereBulle = () => import('./components/MatiereBulle.vue');
const MatiereDetails = () => import('./views/MatiereDetails.vue');
const Maison = () => import('./views/Maison.vue');
const Professeur = () => import('./views/Professeur.vue');
const ProfesseurBulle = () => import('./components/ProfesseurBulle.vue');
const ProfesseurDetails = () => import('./views/ProfesseurDetails.vue');
const Boutique = () => import('./views/Boutique.vue');
const Connexion = () => import('./views/Connexion.vue');  
const Inscription = () => import('./views/Inscription.vue');
const Intranet = () => import('./views/Intranet.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/matieres', name: 'Matiere', component: Matiere },
  { path: '/matiere/:id', name: 'MatiereBulle', component: MatiereBulle },
  { path: '/matieres/:id', name: 'MatiereDetails', component: MatiereDetails },
  { path: '/maisons', name: 'Maison', component: Maison },
  { path: '/professeurs', name: 'Professeur', component: Professeur },
  { path: '/professeur/:id', name: 'ProfesseurBulle', component: ProfesseurBulle },
  { path: '/boutique', name: 'Boutique', component: Boutique },
  { path: '/connexion', name: 'Connexion', component: Connexion },
  { path: '/inscription', name: 'Inscription', component: Inscription },
  { path: '/intranet', name: 'Intranet', component: Intranet },
  { path: '/professeurs/:id', name: 'ProfesseurDetails', component: ProfesseurDetails, props: true }, // <-- Utilise ProfesseurDetails ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;*/

// frontend/src/router/index.ts

/*import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'; // Ajout de RouteRecordRaw pour le typage
import { useAuthStore } from './stores/auth'; // Importez votre store d'authentification

// Importation des composants avec lazy loading
// ⭐ ATTENTION : Vérifiez que les chemins ci-dessous sont corrects par rapport à l'emplacement de ce fichier index.ts ⭐
// Si index.ts est dans 'src/router', alors les chemins vers 'views' et 'components' devraient commencer par '../'
// Si index.ts est directement dans 'src', alors les chemins devraient commencer par './'
const Home = () => import('./views/Accueil.vue');
const Matiere = () => import('./views/Matiere.vue');
const MatiereBulle = () => import('./components/MatiereBulle.vue');
const MatiereDetails = () => import('./views/MatiereDetails.vue');
const Maison = () => import('./views/Maison.vue');
const Professeur = () => import('./views/Professeur.vue');
const ProfesseurBulle = () => import('./components/ProfesseurBulle.vue');
const ProfesseurDetails = () => import('./views/ProfesseurDetails.vue');
const Boutique = () => import('./views/Boutique.vue');
const Connexion = () => import('./views/Connexion.vue');  // Assurez-vous que c'est le nom de votre composant de connexion
const Inscription = () => import('./views/Inscription.vue');
const Intranet = () => import('./views/Intranet.vue'); // Garde la route existante pour 'Intranet'
const IntranetEleve = () => import('./views/IntranetEleve.vue'); // ⭐ NOUVEAU : Importation du composant IntranetEleve

const routes: Array<RouteRecordRaw> = [ // Typage explicite du tableau de routes
  { path: '/', name: 'Home', component: Home },
  { path: '/matieres', name: 'Matiere', component: Matiere },
  { path: '/matiere/:id', name: 'MatiereBulle', component: MatiereBulle },
  { path: '/matieres/:id', name: 'MatiereDetails', component: MatiereDetails },
  { path: '/maisons', name: 'Maison', component: Maison },
  { path: '/professeurs', name: 'Professeur', component: Professeur },
  { path: '/professeur/:id', name: 'ProfesseurBulle', component: ProfesseurBulle },
  { path: '/boutique', name: 'Boutique', component: Boutique },
  { path: '/connexion', name: 'Connexion', component: Connexion },
  { path: '/inscription', name: 'Inscription', component: Inscription },
  { path: '/intranet', name: 'Intranet', component: Intranet }, // Route existante pour 'Intranet'
  { path: '/professeurs/:id', name: 'ProfesseurDetails', component: ProfesseurDetails, props: true },

  // ⭐ NOUVEAU : Route pour l'Intranet Élève ⭐
  {
    path: '/intranet-eleve',
    name: 'IntranetEleve', // Nom de la route spécifique pour l'intranet élève
    component: IntranetEleve,
    meta: { requiresAuth: true, requiredRole: 'eleve' }, // Meta pour la protection de la route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ⭐⭐⭐ Garde de Navigation Globale pour la Protection des Routes ⭐⭐⭐
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); // Obtenir l'instance du store d'authentification

  // Si la route nécessite une authentification (via 'meta.requiresAuth: true')
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      next({ name: 'Connexion' }); // Redirige vers la route nommée 'Connexion'
    } else {
      // L'utilisateur est authentifié, vérifier si un rôle spécifique est requis
      const requiredRole = to.meta.requiredRole as string | undefined;
      const userRole = authStore.getUserRole; // Récupère le nom du rôle de l'utilisateur connecté (ex: 'eleve', 'professeur')

      // Si un rôle est requis pour cette route ET que le rôle de l'utilisateur ne correspond pas
      if (requiredRole && userRole !== requiredRole) {
        console.warn(`Accès refusé: Rôle '${userRole}' non autorisé pour la route '${to.path}'. Rôle requis: '${requiredRole}'.`);
        // Rediriger vers une page d'accès refusé ou la page d'accueil
        next({ name: 'Home' }); // Redirige vers la route nommée 'Home'
      } else {
        // L'utilisateur est authentifié et le rôle est correct (ou aucun rôle spécifique n'est requis), laisser passer
        next();
      }
    }
  } else {
    // La route ne nécessite pas d'authentification, laisser passer
    next();
  }
});

export default router;*/

// frontend/src/router/index.ts

/*import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from './stores/auth'; // Importe ton store d'authentification

// Importe la nouvelle vue de modification de profil
// ⭐ ASSURE-TOI QUE CE CHEMIN EST CORRECT RELATIVEMENT À L'EMPLACEMENT DE CE FICHIER index.ts ⭐
import EditEleveProfilView from './views/EditEleveProfil.vue';

// Importation des autres composants avec lazy loading
const Home = () => import('./views/Accueil.vue');
const Matiere = () => import('./views/Matiere.vue');
const MatiereBulle = () => import('./components/MatiereBulle.vue');
const MatiereDetails = () => import('./views/MatiereDetails.vue');
const Maison = () => import('./views/Maison.vue');
const Professeur = () => import('./views/Professeur.vue');
const ProfesseurBulle = () => import('./components/ProfesseurBulle.vue');
const ProfesseurDetails = () => import('./views/ProfesseurDetails.vue');
const Boutique = () => import('./views/Boutique.vue');
const Connexion = () => import('./views/Connexion.vue');
const Inscription = () => import('./views/Inscription.vue');
const Intranet = () => import('./views/Intranet.vue');
const IntranetEleve = () => import('./views/IntranetEleve.vue');

// Enum pour la clarté des rôles (bonne pratique)
enum UserRole {
  ELEVE = 'eleve',
  PROFESSEUR = 'professeur',
  ADMIN = 'admin',
}

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home, meta: { public: true } },
  { path: '/matieres', name: 'Matiere', component: Matiere, meta: { public: true } },
  { path: '/matiere/:id', name: 'MatiereBulle', component: MatiereBulle, meta: { public: true } },
  { path: '/matieres/:id', name: 'MatiereDetails', component: MatiereDetails, meta: { public: true } },
  { path: '/maisons', name: 'Maison', component: Maison, meta: { public: true } },
  { path: '/professeurs', name: 'Professeur', component: Professeur, meta: { public: true } },
  { path: '/professeur/:id', name: 'ProfesseurBulle', component: ProfesseurBulle, meta: { public: true } },
  { path: '/boutique', name: 'Boutique', component: Boutique, meta: { public: true } },
  { path: '/connexion', name: 'Connexion', component: Connexion, meta: { public: true } },
  { path: '/inscription', name: 'Inscription', component: Inscription, meta: { public: true } },
  { path: '/intranet', name: 'Intranet', component: Intranet, meta: { requiresAuth: true, requiredRole: UserRole.PROFESSEUR } }, // Exemple: Intranet pour les profs/admins
  { path: '/professeurs/:id', name: 'ProfesseurDetails', component: ProfesseurDetails, props: true, meta: { public: true } },

  // Route pour l'Intranet Élève
  {
    path: '/intranet-eleve',
    name: 'intranetEleve',
    component: IntranetEleve,
    meta: { requiresAuth: true, requiredRole: UserRole.ELEVE },
  },
  // ⭐ NOUVELLE ROUTE POUR LA MODIFICATION DU PROFIL ÉLÈVE ⭐
  {
    path: '/intranet-eleve/modifier',
    name: 'editEleveProfil', // Nom de la route pour la navigation
    component: EditEleveProfilView,
    meta: {
      requiresAuth: true, // Nécessite une authentification
      requiredRole: UserRole.ELEVE // Réservé aux élèves
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Si la route est publique (pas de protection), on laisse passer immédiatement
  if (to.meta.public) {
    next();
    return;
  }

  // ⭐ NOUVEAU BLOC CRUCIAL : S'assurer que les données utilisateur sont chargées si un token existe ⭐
  // Ceci gère le scénario de rechargement de page où le token est là mais l'objet 'user' n'est pas encore rempli.
    if (authStore.token && !authStore.user) {
    console.log("Token trouvé mais utilisateur non chargé. Tentative de chargement de l'utilisateur depuis le backend...");
    try {
      await authStore.loadUserFromToken(); // Attend que les données utilisateur soient chargées

      if (!authStore.user) { // Si l'utilisateur n'est toujours pas chargé après l'appel
        console.log("Utilisateur non chargé ou token invalide après l'appel API. Déconnexion.");
        authStore.logout();
        next({ name: 'Connexion' });
        return;
      }
      // La ligne console.log problématique a été supprimée ici.
      // TypeScript devrait maintenant comprendre que 'authStore.user' est non-null pour les lignes suivantes.

    } catch (error) {
      console.error("Échec du chargement de l'utilisateur depuis le token dans la garde de navigation :", error);
      authStore.logout(); // Nettoyer le token si le chargement échoue
      next({ name: 'Connexion' }); // Rediriger vers la page de connexion
      return;
    }
  }

  // Maintenant, on ré-évalue l'état d'authentification et le rôle après le chargement potentiel.
  const isAuthenticated = authStore.isAuthenticated;
  // userRole est utilisé plus bas, donc cette ligne reste essentielle.
  const userRole = authStore.user?.role?.name;

  // Si la route nécessite une authentification ET que l'utilisateur n'est PAS authentifié
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn(`Accès refusé : Authentification requise pour la route '${to.path}'.`);
    next({ name: 'Connexion' });
    return;
  }

  // Si la route nécessite un rôle spécifique ET que l'utilisateur EST authentifié
  if (to.meta.requiredRole && isAuthenticated) {
    const requiredRole = to.meta.requiredRole as UserRole;
    if (userRole !== requiredRole) {
      console.warn(`Accès refusé : Rôle "${userRole}" insuffisant pour la route '${to.path}'. Rôle requis : "${requiredRole}".`);
      next({ name: 'Home' });
      return;
    }
  }

  // Si toutes les conditions sont remplies (authentifié, bon rôle, ou route non protégée), on laisse passer
  next();
});
export default router;
*/


import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from './stores/auth';

// Importe la nouvelle vue de modification de profil élève
import EditEleveProfilView from './views/EditEleveProfil.vue';
// IMPORTE LA VUE POUR L'INTRANET PROFESSEUR
import IntranetProfesseur from './views/IntranetProfesseur.vue';
// IMPORTE LA VUE POUR L'INTRANET ÉLÈVE
import IntranetEleve from './views/IntranetEleve.vue'; // S'assurer que IntranetEleve est bien importé

// Importation des autres composants avec lazy loading
const Home = () => import('./views/Accueil.vue');
const Matiere = () => import('./views/Matiere.vue');
const MatiereBulle = () => import('./components/MatiereBulle.vue');
const MatiereDetails = () => import('./views/MatiereDetails.vue');
const Maison = () => import('./views/Maison.vue');
const Professeur = () => import('./views/Professeur.vue');
const ProfesseurBulle = () => import('./components/ProfesseurBulle.vue');
const ProfesseurDetails = () => import('./views/ProfesseurDetails.vue');
const Boutique = () => import('./views/Boutique.vue');
const Connexion = () => import('./views/Connexion.vue');
const Inscription = () => import('./views/Inscription.vue');
const Intranet = () => import('./views/Intranet.vue'); // Gardé si tu en as besoin, sinon à supprimer

// Enum pour la clarté des rôles
enum UserRole {
  ELEVE = 'eleve',
  PROFESSEUR = 'professeur',
  ADMIN = 'admin',
}

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home, meta: { public: true } },
  { path: '/matieres', name: 'Matiere', component: Matiere, meta: { public: true } },
  { path: '/matiere/:id', name: 'MatiereBulle', component: MatiereBulle, meta: { public: true } },
  { path: '/matieres/:id', name: 'MatiereDetails', component: MatiereDetails, meta: { public: true } },
  { path: '/maisons', name: 'Maison', component: Maison, meta: { public: true } },
  { path: '/professeurs', name: 'Professeur', component: Professeur, meta: { public: true } },
  { path: '/professeur/:id', name: 'ProfesseurBulle', component: ProfesseurBulle, meta: { public: true } },
  { path: '/boutique', name: 'Boutique', component: Boutique, meta: { public: true } },
  { path: '/connexion', name: 'Connexion', component: Connexion, meta: { public: true } },
  { path: '/inscription', name: 'Inscription', component: Inscription, meta: { public: true } },
  { path: '/intranet', name: 'IntranetGeneral', component: Intranet, meta: { requiresAuth: true } }, // Renommée pour éviter confusion
  { path: '/professeurs/:id', name: 'ProfesseurDetails', component: ProfesseurDetails, props: true, meta: { public: true } },

  // Route pour l'Intranet Élève
  {
    path: '/intranet-eleve',
    name: 'intranetEleve',
    component: IntranetEleve,
    meta: { requiresAuth: true, roles: [UserRole.ELEVE] }, // Utilise 'roles' pour la vérification dans beforeEach
  },
  // Route pour la modification du profil élève
  {
    path: '/intranet-eleve/modifier',
    name: 'editEleveProfil',
    component: EditEleveProfilView,
    meta: {
      requiresAuth: true,
      roles: [UserRole.ELEVE]
    }
  },

  // ROUTE POUR L'INTRANET PROFESSEUR
  {
    path: '/intranet-professeur',
    name: 'intranetProfesseur',
    component: IntranetProfesseur,
    meta: { requiresAuth: true, roles: [UserRole.PROFESSEUR] },
  },

  // Tu peux ajouter une route pour l'intranet admin ici plus tard
  // {
  //   path: '/intranet-admin',
  //   name: 'intranetAdmin',
  //   component: IntranetAdmin, // Assure-toi d'importer IntranetAdmin
  //   meta: { requiresAuth: true, roles: [UserRole.ADMIN] },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// GARDE DE NAVIGATION GLOBALE (AVEC LA VÉRIFICATION DES RÔLES)
router.beforeEach(async (to, from, next) => { // ⭐ Ajout de 'async' ici
  const authStore = useAuthStore();

  // Étape 1 : Gérer le chargement initial de l'utilisateur si le token existe
  // Cela est crucial pour que authStore.user soit rempli AVANT les vérifications de rôle
  if (authStore.token && !authStore.user) {
    console.log("Token trouvé mais utilisateur non chargé. Tentative de chargement...");
    try {
      await authStore.loadUserFromToken(); // Attendre que l'utilisateur soit chargé
      console.log("Utilisateur chargé avec succès dans la garde:", authStore.user);
    } catch (error) {
      console.error("Échec du chargement de l'utilisateur depuis le token dans la garde:", error);
      // Si le chargement échoue (token invalide, erreur réseau), déconnecte et redirige
      authStore.logout();
      next({ name: 'Connexion' });
      return; // Empêche l'exécution du reste de la garde
    }
  }

  // Étape 2 : Vérification de l'accès basée sur l'authentification et les rôles
  // Maintenant, authStore.user est supposé être à jour si un token existait
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user?.role?.name; // Accède au rôle après le potentiel chargement

  // Si la route est publique (pas de protection), on laisse passer immédiatement
  if (to.meta.public) {
    next();
    return;
  }

  // Si la route nécessite une authentification ET que l'utilisateur n'est PAS authentifié
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn(`Accès refusé: Authentification requise pour la route '${to.path}'.`);
    alert("Vous devez être connecté pour accéder à cette page."); // Message pour l'utilisateur
    next({ name: 'Connexion' });
    return;
  }

  // Si la route nécessite un rôle spécifique ET que l'utilisateur EST authentifié
  const requiredRoles = to.meta.roles as UserRole[] | undefined;
  if (to.meta.requiresAuth && requiredRoles && requiredRoles.length > 0) {
    if (!userRole || !requiredRoles.includes(userRole as UserRole)) {
      console.warn(`Accès refusé: Rôle "${userRole || 'non défini'}" insuffisant pour la route '${to.path}'. Rôles requis: "${requiredRoles.join(', ')}".`);
      alert("Accès non autorisé. Vous n'avez pas les droits nécessaires."); // Message pour l'utilisateur
      next({ name: 'Home' }); // Redirige vers la page d'accueil ou une page 403
      return;
    }
  }

  // Étape 3 : Redirection des utilisateurs déjà connectés depuis les pages de connexion/inscription
  if ((to.name === 'Connexion' || to.name === 'Inscription') && isAuthenticated) {
    switch (userRole) {
      case UserRole.ELEVE:
        next({ name: 'intranetEleve' });
        break;
      case UserRole.PROFESSEUR:
        next({ name: 'intranetProfesseur' });
        break;
      case UserRole.ADMIN:
        // next({ name: 'intranetAdmin' }); // Décommenter si l'intranet admin est prêt
        next({ name: 'Home' }); // Par défaut pour admin si pas encore de route
        break;
      default:
        next({ name: 'Home' }); // Rôle non reconnu ou par défaut
    }
    return;
  }

  // Si toutes les vérifications sont passées, on laisse passer
  next();
});

export default router;