# 🔒 Guide de Sécurité - Portfolio

## 🚨 Fichiers Sensibles (JAMAIS dans Git)

### ❌ Fichiers automatiquement ignorés :
- `backend/.env` - Identifiants email Gmail
- `backend/contacts.db` - Base de données avec messages privés
- `backend/node_modules/` - Dépendances
- Tous les fichiers `*.log`

### ✅ Fichiers sécurisés inclus :
- `backend/.env.example` - Template sans vraies valeurs
- `backend/server.js` - Code source (pas de secrets)
- `backend/package.json` - Liste des dépendances

## 🔧 Configuration après Clone

### 1. Configuration Backend
```bash
cd backend
cp .env.example .env
nano .env  # Ajouter vos vraies valeurs
```

### 2. Variables à configurer :
```env
# Dans backend/.env (JAMAIS committé)
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application-16-caracteres
PORT=5000
```

### 3. Installation :
```bash
# Backend
cd backend
npm install

# Frontend  
cd ..
npm install
```

## 🚀 Déploiement Sécurisé

### Variables d'environnement Vercel :
```bash
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
```

### Variables d'environnement Netlify :
```
EMAIL_USER = votre-email@gmail.com
EMAIL_PASS = mot-de-passe-application
```

## 🛡️ Bonnes Pratiques

### ✅ À faire :
- Utiliser des mots de passe d'application Gmail (pas le mot de passe principal)
- Activer la 2FA sur Gmail
- Garder `.env` local uniquement
- Utiliser des variables d'environnement en production

### ❌ À éviter :
- Jamais committer les fichiers `.env`
- Jamais hardcoder des secrets dans le code
- Jamais partager les mots de passe d'application
- Jamais committer la base de données avec des vraies données

## 🔍 Vérification avant Push

### Commande de vérification :
```bash
# Vérifier que les fichiers sensibles sont ignorés
git status --ignored

# Vérifier le contenu avant commit
git diff --cached

# Vérifier qu'aucun secret n'est dans le code
grep -r "password\|secret\|key" src/ --exclude-dir=node_modules
```

## 🆘 En cas de Leak Accidentel

### Si vous avez accidentellement committé des secrets :

1. **Changez immédiatement les mots de passe**
2. **Supprimez de l'historique Git :**
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch backend/.env' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push :**
   ```bash
   git push origin --force --all
   ```

## 📧 Configuration Gmail Sécurisée

### Étapes :
1. **Google Account** → **Security**
2. **2-Step Verification** → Enable
3. **App passwords** → Generate
4. **App name:** "Portfolio Backend"
5. **Copy 16-character password**
6. **Use in .env file only**

## 🎯 Checklist avant GitHub

- [ ] `.gitignore` mis à jour
- [ ] `backend/.env` dans ignored files
- [ ] `backend/contacts.db` dans ignored files
- [ ] `.env.example` créé avec des valeurs factices
- [ ] `README.md` et `DEPLOYMENT_GUIDE.md` créés
- [ ] Aucun secret dans le code source
- [ ] Variables d'environnement documentées

## 🔗 Ressources

- [GitHub Secrets Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Git Filter Branch](https://git-scm.com/docs/git-filter-branch)

---

**⚠️ Rappel Important :** Ce portfolio contient un système de contact avec base de données. Assurez-vous que tous les secrets restent locaux ou dans les variables d'environnement de production.
