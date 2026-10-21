# Invitation de mariage virtuelle

## Structure
```
mariage/
├── index.html        # Structure de la page (enveloppe, accueil, programme, lieu, dress code, RSVP)
├── css/style.css     # Couleurs, polices, animations
├── js/config.js      # ✏️ VOS INFORMATIONS (prénoms, date, lieu, programme, WhatsApp...)
├── js/main.js        # Logique (compte à rebours, ouverture de l'enveloppe, RSVP)
└── assets/           # Vos futures images / musique
```

## Modifier
1. Ouvrez le dossier dans votre éditeur (Antigravity, VS Code...).
2. Éditez **js/config.js** : c'est le seul fichier à changer pour les infos.
3. Couleurs : variables `--blue`, `--paper`, `--gold` en haut de **css/style.css**.
4. Pour voir le résultat : ouvrez `index.html` dans le navigateur (ou extension « Live Server »).

## Mettre en ligne (gratuit)
- Netlify : créez un compte, puis glissez le dossier `mariage` sur app.netlify.com/drop
- ou GitHub Pages (dépôt public + Settings → Pages)
