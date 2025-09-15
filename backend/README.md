# 🚀 Portfolio Backend

Backend Node.js pour le système de contact du portfolio d'Oussama AHJLI.

## ⚡ Démarrage rapide

```bash
# 1. Démarrer le backend
./start-backend.sh

# 2. Ouvrir le panel d'administration
./open-admin.sh
```

## 📧 Configuration Email

1. **Copiez le fichier de configuration :**
   ```bash
   cp .env.example .env
   ```

2. **Configurez Gmail :**
   - Activez l'authentification à 2 facteurs
   - Générez un mot de passe d'application
   - Modifiez le fichier `.env` :
   ```bash
   EMAIL_USER=ahjli.contact@gmail.com
   EMAIL_PASS=votre_mot_de_passe_application
   ```

3. **Guide détaillé :** Consultez `EMAIL_SETUP_GUIDE.md`

## 🎯 Fonctionnalités

- ✅ **Base de données locale** (SQLite) - `contacts.db`
- ✅ **Notifications email** automatiques
- ✅ **Panel d'administration** web
- ✅ **API REST** sécurisée
- ✅ **Rate limiting** (5 messages/15min)
- ✅ **Validation** des données
- ✅ **Fallback mailto** si backend indisponible

## 🌐 Endpoints API

- `POST /api/contact` - Envoyer un message
- `GET /api/contacts` - Lister tous les messages
- `PATCH /api/contacts/:id/read` - Marquer comme lu
- `GET /api/health` - Vérifier le statut

## 📊 Panel d'Administration

Accédez à : `http://localhost:5000/api/contacts` ou ouvrez `admin.html`

**Fonctionnalités :**
- 📈 Statistiques en temps réel
- 📧 Messages non lus en surbrillance
- ✉️ Réponse directe par email
- 🔄 Actualisation automatique
- 📱 Design responsive

## 🔧 Scripts disponibles

```bash
./start-backend.sh    # Démarrer le serveur
./open-admin.sh       # Ouvrir le panel admin
npm start             # Démarrer manuellement
npm run dev           # Mode développement avec nodemon
```

## 📁 Base de données

**Localisation :** `contacts.db` (SQLite)

**Structure :**
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'unread'
);
```

## 🛡️ Sécurité

- **Helmet.js** - Headers de sécurité
- **CORS** - Protection cross-origin
- **Rate Limiting** - Protection contre le spam
- **Validation** - Données d'entrée sécurisées
- **Environment Variables** - Configuration sécurisée

## 🚨 Dépannage

### Backend ne démarre pas
```bash
# Vérifier Node.js
node --version

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Emails non reçus
1. Vérifiez la configuration `.env`
2. Testez avec un mot de passe d'application Gmail
3. Consultez les logs du serveur

### Port 5000 occupé
```bash
# Changer le port dans .env
PORT=3001

# Ou tuer le processus
sudo lsof -ti:5000 | xargs kill -9
```

## 📞 Support

- 📖 Guide complet : `EMAIL_SETUP_GUIDE.md`
- 🐛 Logs du serveur dans le terminal
- 🔍 Test API avec curl ou Postman

---

**Développé avec ❤️ pour le portfolio d'Oussama AHJLI**
