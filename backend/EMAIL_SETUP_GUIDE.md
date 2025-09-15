# 📧 Email Configuration Guide

## Configuration pour recevoir les emails de votre portfolio

### Option 1: Configuration Gmail (Recommandée)

#### Étape 1: Activer l'authentification à 2 facteurs
1. Allez sur [Google Account](https://myaccount.google.com/)
2. Cliquez sur **Sécurité** dans le menu de gauche
3. Activez **Validation en 2 étapes** si ce n'est pas déjà fait

#### Étape 2: Générer un mot de passe d'application
1. Dans **Sécurité** → **Validation en 2 étapes**
2. Faites défiler vers le bas et cliquez sur **Mots de passe des applications**
3. Sélectionnez l'application : **Autre (nom personnalisé)**
4. Tapez : "Portfolio Backend"
5. Cliquez sur **Générer**
6. **COPIEZ LE MOT DE PASSE** généré (16 caractères)

#### Étape 3: Configurer le fichier .env
Ouvrez le fichier `.env` dans le dossier `backend/` et modifiez :

```bash
# Server Configuration
PORT=5000

# Email Configuration
EMAIL_USER=ahjli.contact@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_16_caracteres
```

### Option 2: Autres fournisseurs d'email

#### Outlook/Hotmail
```bash
EMAIL_USER=votre_email@outlook.com
EMAIL_PASS=votre_mot_de_passe_application
```

#### Yahoo Mail
```bash
EMAIL_USER=votre_email@yahoo.com
EMAIL_PASS=votre_mot_de_passe_application
```

## 🚀 Démarrage du système

### 1. Démarrer le backend
```bash
cd backend
./start-backend.sh
```

Ou manuellement :
```bash
cd backend
npm start
```

### 2. Démarrer le frontend (dans un autre terminal)
```bash
npm start
```

### 3. Accéder au panel d'administration
Ouvrez dans votre navigateur : `http://localhost:5000/api/contacts`

Ou ouvrez directement le fichier : `backend/admin.html`

## 📊 Fonctionnalités du système

### Base de données locale (SQLite)
- **Localisation** : `backend/contacts.db`
- **Sauvegarde automatique** de tous les messages
- **Pas besoin d'internet** pour sauvegarder
- **Données persistantes** même si le serveur redémarre

### Notifications email (optionnel)
- **Email automatique** à votre adresse quand quelqu'un vous contacte
- **Contenu complet** du message avec détails
- **Fonctionne même si vous n'êtes pas devant votre PC**

### Panel d'administration
- **Interface web** pour voir tous les messages
- **Statistiques** : total, non lus, messages du jour
- **Marquer comme lu**
- **Répondre directement** via email
- **Actualisation automatique** toutes les 30 secondes

## 🔧 Test de configuration

### 1. Tester le backend
```bash
curl -X GET http://localhost:5000/api/health
```

Réponse attendue :
```json
{
  "success": true,
  "message": "Portfolio backend is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "database": "Connected"
}
```

### 2. Tester l'envoi d'email
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "Ceci est un test du système de contact."
  }'
```

### 3. Voir les messages reçus
```bash
curl -X GET http://localhost:5000/api/contacts
```

## 🛠 Dépannage

### Problème : "Error: Invalid login"
- Vérifiez que l'authentification à 2 facteurs est activée
- Utilisez un mot de passe d'application, pas votre mot de passe normal
- Vérifiez que l'email est correct dans .env

### Problème : "ECONNREFUSED"
- Le backend n'est pas démarré
- Vérifiez que le port 5000 n'est pas utilisé par autre chose
- Redémarrez le backend

### Problème : Messages sauvés mais pas d'email
- C'est normal si EMAIL_USER et EMAIL_PASS ne sont pas configurés
- Les messages sont quand même sauvés dans la base de données
- Configurez l'email pour recevoir les notifications

### Problème : "Backend unavailable" dans le frontend
- Le backend n'est pas démarré sur le port 5000
- Vérifiez la console du backend pour les erreurs
- Le frontend utilise mailto comme fallback

## 📁 Structure des fichiers

```
backend/
├── server.js              # Serveur principal
├── package.json           # Dépendances
├── .env                   # Configuration (à créer)
├── .env.example          # Exemple de configuration
├── contacts.db           # Base de données (créée automatiquement)
├── admin.html            # Interface d'administration
├── start-backend.sh      # Script de démarrage
└── EMAIL_SETUP_GUIDE.md  # Ce guide
```

## 🔒 Sécurité

- **Rate limiting** : Maximum 5 messages par 15 minutes par IP
- **Validation** des données d'entrée
- **Protection CORS** configurée
- **Helmet.js** pour les headers de sécurité
- **Pas de stockage** des mots de passe en plain text

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez les logs du backend dans le terminal
2. Testez avec curl les endpoints
3. Vérifiez que tous les ports sont disponibles
4. Consultez ce guide pour la configuration email

**Votre système est maintenant prêt à recevoir et gérer les messages de contact !** 🎉
