#!/bin/bash

echo "📧 Configuration Email pour Portfolio Backend"
echo "============================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
fi

echo "Pour recevoir les emails de contact, vous devez configurer Gmail :"
echo ""
echo "1️⃣  Étapes à suivre :"
echo "   • Allez sur https://myaccount.google.com/"
echo "   • Sécurité → Validation en 2 étapes (activez si pas fait)"
echo "   • Mots de passe des applications → Générer"
echo "   • Nom : 'Portfolio Backend'"
echo "   • Copiez le mot de passe généré (16 caractères)"
echo ""

read -p "2️⃣  Entrez votre email Gmail (ahjli.contact@gmail.com) : " EMAIL_USER
read -s -p "3️⃣  Entrez le mot de passe d'application (16 caractères) : " EMAIL_PASS
echo ""

# Update .env file
echo "📝 Mise à jour du fichier .env..."

# Create new .env content
cat > .env << EOF
# Portfolio Backend Configuration

# Server Configuration
PORT=5000

# Email Configuration
EMAIL_USER=$EMAIL_USER
EMAIL_PASS=$EMAIL_PASS

# Gmail App Password Instructions:
# 1. Go to Google Account settings
# 2. Security > 2-Step Verification (must be enabled)
# 3. App passwords > Generate app password
# 4. Use the generated password here (not your regular password)
EOF

echo "✅ Configuration email terminée !"
echo ""
echo "🔄 Redémarrage du backend nécessaire pour appliquer les changements..."
echo ""
read -p "Voulez-vous redémarrer le backend maintenant ? (y/N) : " RESTART

if [[ $RESTART =~ ^[Yy]$ ]]; then
    echo "🛑 Arrêt du backend actuel..."
    pkill -f "node server.js" 2>/dev/null || true
    sleep 2
    
    echo "🚀 Redémarrage du backend..."
    npm start &
    
    sleep 3
    echo ""
    echo "✅ Backend redémarré avec la configuration email !"
else
    echo "⚠️  N'oubliez pas de redémarrer le backend pour appliquer les changements :"
    echo "   pkill -f 'node server.js' && npm start"
fi

echo ""
echo "🧪 Test de la configuration :"
echo "   curl -X GET http://localhost:5000/api/health"
echo ""
echo "📊 Panel d'administration :"
echo "   ./open-admin.sh"
echo ""
echo "📖 Guide complet : EMAIL_SETUP_GUIDE.md"
