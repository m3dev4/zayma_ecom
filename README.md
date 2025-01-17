 
 ------------------------------------
 
 
 
 ____   _   __   __ __  __   _   
|_  /  / \  \ \ / /|  \/  | / \  
 / /  / _ \  \ V / | |\/| |/ _ \ 
/___\/_/ \_\  |_|  |_|  |_/_/ \_\

--------------------------------------
# 🚀 Application E-commerce API

## 📝 Description
API RESTful pour une application e-commerce avec système d'authentification avancé, gestion des utilisateurs et système de vérification par email.

## 🛠️ Technologies Utilisées
- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL
- JWT (JSON Web Tokens)
- Nodemailer
- Bcrypt

## 🏗️ Structure du Projet


├── config/
│ └── db.js
├── controllers/
│ └── userController.js
├── middlewares/
│ ├── authMiddleware.js
│ ├── errorMiddleware.js
│ └── asyncHandler.js
├── routes/
│ └── userRoute.js
├── utils/
│ ├── createToken.js
│ ├── sendEmail.js
│ └── db.js
├── .env
└── index.js


## 🔑 Fonctionnalités Principales

### 👤 Authentification & Utilisateurs
1. **Inscription (`POST /api/users`)**
   - Création de compte utilisateur
   - Vérification par email
   - Validation des données
   ```json
   {
     "nom": "string",
     "prenom": "string",
     "email": "string",
     "password": "string"
   }
   ```

2. **Connexion (`POST /api/users/login`)**
   - Authentification JWT
   - Gestion des sessions
   ```json
   {
     "email": "string",
     "password": "string"
   }
   ```

3. **Réinitialisation de mot de passe**
   - Demande (`POST /api/users/forgot-password`)
   - Réinitialisation (`POST /api/users/reset-password/:token`)

4. **Vérification Email (`GET /api/users/verify/:token`)**
   - Validation du compte utilisateur

### 👤 Gestion du Profil
1. **Obtenir le profil (`GET /api/users/profile`)**
2. **Mettre à jour le profil (`PUT /api/users/profile`)**
3. **Déconnexion (`POST /api/users/logout`)**

### 👑 Routes Admin
1. **Liste des utilisateurs (`GET /api/users`)**
2. **Détails utilisateur (`GET /api/users/:id`)**
3. **Supprimer utilisateur (`DELETE /api/users/:id`)**

## 🔒 Sécurité
- Hachage des mots de passe (bcrypt)
- Tokens JWT sécurisés
- Protection CSRF
- Validation des données
- Gestion des sessions

## 📧 Système d'Emails
- Vérification de compte
- Réinitialisation de mot de passe
- Templates HTML personnalisés

## 🚀 Installation

1. **Cloner le repository**
2. **Installer les dépendances**
3. **Configurer le fichier .env**
4. **Lancer le serveur**


# Server

PORT=5000
NODE_ENV=development


# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"


# JWT
JWT_SECRET=votre_secret_tres_long

# SMTP
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=
SMTP_PASS=

# Base URL
BASE_URL=http://localhost:8080


4. **Configuration base de données**

npx prisma migrate dev

5. **Lancer le serveur**
```bash
npm run dev
```

## 🔒 Sécurité

### Mesures de Protection
- **Rate Limiting** : 
  - Global : 100 requêtes/15min
  - Auth : 5 tentatives/heure
- **Headers Sécurisés** (Helmet) :
  - CSP (Content Security Policy)
  - CORS
  - XSS Protection
  - et autres...
- **Protection XSS**
- **Prevention Param Pollution**
- **Validation des Données**
- **Sanitization des Entrées**
- **Tokens JWT Sécurisés**
- **Protection CSRF**
- **Gestion des Sessions**

### Bonnes Pratiques
- Validation des entrées côté serveur
- Hachage des mots de passe avec bcrypt
- Tokens JWT avec expiration
- Sessions avec tracking IP
- Logs de sécurité
- Sanitization des données MongoDB

## 🤝 Contribution
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License
MIT License

## 👥 Auteurs
- @m3dev4
