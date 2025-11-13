# 🚢 Russell Marina API

> API privée + interface EJS pour la gestion du port de plaisance de Russell.

---

## 🌐 Liens du projet

- **Repository GitHub :** [https://github.com/vlad-website/api-kharkovskyi](https://github.com/vlad-website/api-kharkovskyi)
- **Application hébergée :** [https://russell-marina.onrender.com](https://russell-marina.onrender.com)
- **Documentation API (Swagger) :** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 👤 Compte de test

| Champ | Valeur |
|-------|---------|
| Email | admin@example.com |
| Mot de passe | 123456 |

*(Ce compte est créé via POST /users si la base est réinitialisée.)*

---

## 🚀 Installation & Exécution

```bash
# 1. Cloner le dépôt
git clone https://github.com/vlad-website/api-kharkovskyi.git
cd api-kharkovskyi

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
cp .env.example .env

# 4. Importer les données
npm run import:data

# 5. Lancer le serveur
npm run dev
Application accessible sur http://localhost:3000

📚 Documentation API
Swagger UI : /api-docs

Page statique : /docs

🧩 Structure du projet
pgsql
Copier le code
src/
├── app.js
├── server.js
├── models/
│   ├── User.js
│   ├── Catway.js
│   └── Reservation.js
├── routes/
│   ├── routes.js
│   ├── userRoutes.js
│   ├── authRoutes.js
│   └── catwayRoutes.js
├── middlewares/
│   ├── auth.js
│   └── error.js
├── views/
│   ├── layout.ejs
│   ├── index.ejs
│   ├── dashboard.ejs
│   └── docs.ejs
├── data/
│   ├── catways.json
│   ├── reservations.json
│   └── importData.js
└── docs/
    └── swagger.yaml
⚙️ Scripts NPM
Script	Description
npm run dev	Lancer en mode développement (nodemon)
npm start	Lancer en production
npm run import:data	Importer les données JSON dans MongoDB

💡 Technologies principales
Node.js + Express

MongoDB + Mongoose

EJS + express-ejs-layouts

JWT (authentification)

Swagger UI pour la documentation

Joi pour la validation

🧑‍💻 Auteur
Vladyslav Kharkovskyi
Projet scolaire — Gestion du port de plaisance “Russell Marina”.
