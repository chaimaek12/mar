# ✨ Invitation de Mariage Virtuelle & Interactive (Édition Créative)

Bienvenue sur le projet d'invitation de mariage numérique, interactive, poétique et multi-thèmes.

---

## 🎨 Les 3 Thèmes Créatifs Inclus

Le site intègre un sélecteur d'ambiance en temps réel permettant aux invités de choisir leur univers :

1. **✨ Nuit Étoilée & Or Impérial (`celestial`)** : Un bleu nuit profond, de l'or chatoyant, des particules d'étoiles scintillantes et des cartes en verre givré (*glassmorphism*).
2. **🌿 Jardin Bohème & Terracotta (`boho`)** : Des teintes douces terracotta, sauge et lin naturel avec une ambiance lumineuse et chaleureuse.
3. **🌸 Rose Poudré & Nacre (`romantic`)** : Un univers doux et romantique, orné de pétales de rose flottants et de reflets poudrés.

---

## 🌟 Fonctionnalités Créatives

- **Enveloppe 3D avec Sceau de Cire Réaliste** : Animation de décachetage interactive, son de carillon doux via *Web Audio API* et gerbe d'étincelles dorées.
- **Particules d'Ambiance Dynamiques** : Étoiles et pétales animés en arrière-plan sans ralentir la navigation.
- **Ambiance Musicale Intégrée** : Bouton flottant jouant une douce mélodie romantique (arpèges de harpe inspirés du Canon de Pachelbel) sans nécessiter de fichier MP3 externe lourd.
- **Compte à Rebours en Temps Réel** : Jours, heures, minutes et secondes calculés en direct.
- **Bouton « Ajouter à mon agenda »** : Synchronisation en 1 clic avec Google Calendar.
- **Notre Histoire** : Cartes d'étapes romantiques (La rencontre, les voyages, la demande).
- **Programme Déroulé** : Frise chronologique avec icônes illustrées (Cérémonie, Cocktail, Dîner, Soirée dansante).
- **Lieu d'Exception & Accès** : Boutons directs Google Maps, Waze et bouton de copie instantanée de l'adresse avec confirmation visuelle.
- **Dress Code & Nuances** : Échantillons de couleurs interactifs avec noms de teintes et conseils vestimentaires pour elle et lui.
- **Livre d'Or Virtuel** : Les proches peuvent laisser un vœu ou un mot doux directement sur le site (sauvegarde automatique locale).
- **RSVP WhatsApp Intelligent** : Formulaire avec choix de présence, nombre d'invités, régime alimentaire, demande de musique et génération instantanée d'un message WhatsApp prêt à être envoyé.
- **Pluie de Confettis Dorés** : Célébration visuelle lors de l'ouverture et lors de la confirmation du RSVP.

---

## 🚀 Comment lancer le projet en local

### Option 1 : Serveur Node.js (Recommandé)
```bash
node server.js
```
Puis ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000).

### Option 2 : Ouverture directe du fichier
Faites un double-clic sur `index.html` ou ouvrez-le avec votre navigateur favori (Chrome, Edge, Firefox, Safari).

---

## ✏️ Personnaliser vos informations

Tout se modifie simplement dans le fichier **`js/config.js`** :
- **Prénoms & Initiales** : `n1: "Sara"`, `n2: "Youssef"`
- **Date & Heure** : `date: "2027-06-19T17:00:00"`
- **Lieu & Adresse** : `place: "Villa des Roses"`, `addr: "Route de Bouskoura, Casablanca"`
- **Histoire du couple** : tableau `story`
- **Programme** : tableau `program`
- **Couleurs & Nuances** : `colorDetails`
- **Numéro WhatsApp de réception** : `phone: "212600000000"` (indiquez l'indicatif sans `+` ni espaces)
- **Thème par défaut** : `defaultTheme: "celestial"` (`"celestial"`, `"boho"` ou `"romantic"`)

---

## 🌐 Mettre en ligne gratuitement

- **Netlify** : Déposez directement le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop) (aucun compte payant nécessaire).
- **GitHub Pages** : Créez un dépôt et activez Pages dans `Settings > Pages`.
- **Vercel** : Importez le projet en un clic.
