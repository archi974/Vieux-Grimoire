<h1 align="center">Mon Vieux Grimoire</h1>

<div align="center">
    <a href="https://www.mongodb.com/docs/">
      <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
    <a href="https://expressjs.com/">
      <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="ExpressJs" />
    </a>
    <a href="https://nodejs.org/en/">
      <img src="https://img.shields.io/badge/node.js%20-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJs" />
    </a>
</div>

## Projet 7: Développez le back-end d'un site de notation de livres
## Informations globales :

- Statut : 🟢 Terminé
- Projet réalisé seul
- Lien vers le [GitHub](https://github.com/archi974/Vieux-Grimoire)

## Mise en situation :

<p align="justify">Vous êtes développeur back-end en freelance depuis maintenant un an dans la région de Lille. Vous avez l’habitude de travailler avec Kévin, un développeur front-end plus expérimenté que vous, et qui a déjà un bon réseau de contacts dans le milieu.  

Kévin vous contacte pour vous proposer de travailler avec lui en mutualisant vos compétences front / back sur un tout nouveau projet qui lui a été proposé. Il s’agit d’une petite chaîne de librairies qui souhaite ouvrir un site de référencement et de notation de livres.</p>

## Objectif :

- Mise en place de l'application ✅
- Créez un serveur Express simple ✅
- Créer une API RESTful ✅
- Mettez en place un système d'authentification sur votre application ✅
- Ajoutez une gestion des fichiers utilisateur sur l'application ✅
- Ajouter la gestion de l'ajout d'une notation d'un livre ✅
- Ajouter la gestion du calcul de la note moyenne d'un livre ✅

## Spécification technique de l’API :

Ce document détaille les besoins de l’API requis pour le bon fonctionnement du front-end.

|  | Point d'accès | Authentification | Corps de la requête (cas échéant) | Type de réponse attendu | Fonction |
| :---: | :---: | :---: | :---: | :---: | :---: |
| POST | /api/auth/signup | Non requis | { email: string, password: string } | { message: string } | Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données. |
| POST | /api/auth/login | Non requis | { email: string, password: string } | { userId: string, token: string } | Vérification des informations d'identification de l'utilisateur ; renvoie l’_id de l'utilisateur depuis la base de données et un token web JSON signé (contenant également l'_id de l'utilisateur). |
| GET | /api/books | Non requis | - | Array of books | Renvoie un tableau de tous les livres de la base de données. |
| GET | /api/books/:id | Non requis | - | Single book | Renvoie le livre avec l’_id fourni. |
| GET | /api/books/bestrating | Non requis | - | Array of books | Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne. |
| POST | /api/books | Requis | { book: string, image: file } | { message: string } **Verb** | Capture et enregistre l'image, analyse le livre transformé en chaîne de caractères, et l'enregistre dans la base de données en définissant correctement son ImageUrl. Initialise la note moyenne du livre à 0 et le rating avec un tableau vide. Remarquez que le corps de la demande initiale est vide; lorsque Multer est ajouté, il renvoie une chaîne pour le corps de la demandeen fonction des données soumises avec le fichier. |
| PUT | /api/books/:id | Requis | EITHER Book as JSON OR { book: string, image: file } | { message: string } | Met à jour le livre avec l'_id fourni. Si une image est téléchargée, elle est capturée, et l’ImageUrl du livre est mise à jour. Si aucun fichier n'est fourni, les informations sur le livre se trouvent directement dans le corps de la requête (req.body.title, req.body.author, etc.). Si un fichier est fourni, le livre transformé en chaîne de caractères se trouve dans req.body.book. Notez que le corps de la demande initiale est vide ; lorsque Multer est ajouté, il renvoie une chaîne du corps de la demande basée sur les données soumises avec le fichier. |
| DELETE | /api/books/:id | Requis | - | { message: string } | Supprime le livre avec l'_id fourni ainsi que l’image associée. |
| POST | /api/books/:id/rating | Requis | { userId: string, rating: number } | Single book | Définit la note pour le user ID fourni. La note doit être comprise entre 0 et 5. L'ID de l'utilisateur et la note doivent être ajoutés au tableau "rating" afin de ne pas laisser un utilisateur noter deux fois le même livre. Il n’est pas possible de modifier une note. La note moyenne "averageRating" doit être tenue à jour, et le livre renvoyé en réponse de la requête. |

## ⛔ API Errors

Les erreurs éventuelles doivent être renvoyées telles qu'elles sont produites, sans modification ni ajout. Si
nécessaire, utilisez une nouvelle Error().


## 🔃 API Routes

Toutes les routes pour les livres doivent disposer d'une autorisation (le token est envoyé par le front-end avec l'en-tête d'autorisation "bearer"»). Avant qu’un utilisateur puisse apporter des modifications à la route livre (book), le code doit vérifier si le user ID actuel correspond au user ID du livre. Si le user ID ne correspond pas, renvoyer « 403: unauthorized request ». Cela permet de s'assurer que seul le propriétaire d’un livre puisse apporter des modifications à celui-ci.

## 🛡 Sécurité

- Le mot de passe de l'utilisateur doit être haché.
- L'authentification doit être renforcée sur toutes les routes livre (book) requises.
- Les adresses électroniques dans la base de données sont uniques, et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs.
- La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.
- Les erreurs issues de la base de données doivent être remontées.

## Etape de récupération et lancement du projet

- Récupérer le dépôt de GitHub `git clone git@github.com:archi974/Vieux-Grimoire.git`.
- Ouvrir un terminal et accéder au dossier back `cd backend`
- Installer les dépendances `npm i`
- Lancer le serveur `npm start`
- Ouvrir un autre terminal et accéder au dossier front `cd frontend`
- Installer les dépendances `npm i`
- Lancer le serveur `npm start`

## Etape de création du projet

- Installer [Visual Studio Code](https://code.visualstudio.com/).
- Avoir un terminal en bash.
- Crée un dépôt GitHub.
- Récupérer la clé SSH du dépôt.
- Récupérer le dépôt en local `git clone lien-ssh nom-du-projet`.
- Entrer dans le dossier `cd nom-du-projet`.
  
- Pour le backend :
  - Crée un dossier backend `mkdir backend`
  - Accéder au dossier backend `cd backend`
  - Pour crée le package.json qui contiendra les dépendances on doit faire `npm init`
  - Tout valider (ou possibilité de changer de nom de projet)
  - Faire un .gitignore et y écrire node_module voir récupérer dans le frontend le contenu du .gitignore
  - Créer le fichier JS correspondant au package.json (ex: index.js)
  - Le reste se fait manuellement

- Pour la base de donnée :
  - Ce connecté sur [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  - Crée un projet sur MongoDB Atlas
  - Crée une base de donnée : Database > Create
  - Crée un cluster pour définir une route pour la base de donnée :
    - Connect > Connect to your application > Drivers > Add your connection string into your application code
  - Changer l'uri du cluster en ajoutant le nom de la base de donnée `mongodb+srv://<userDB>:<passwordDB>@<clusterDB>.mongodb.net/?retryWrites=true&w=majority`
  - Data access : définir un utilisateur avec les droits d'écriture et de lecture

- Pour le frontend :
  - Ouvrir un nouveau terminal
  - Accéder au dossier frontend `cd frontend`
  - Installer les dépendances `npm i`
  *⚠ Toujours lancer le serveur backend avant le frontend pour éviter les erreurs de récupération de donnée.*
  - Lancer le serveur front `npm start`

### Pour plus de sécurité

- Il serais conseiller une fois en production d'utilisé PM2 à la place de nodemon pour plus de sécurité par exemple pour la mémoire RAM que j'utilise pour stocker provisoirement une image pour l'optimiser, cela évite les attaques de type Denial of Service (DoS).

## Aperçu finale

Etant un projet en backend, il y a peu de visuel mais on peu aperçevoir les données récupérer si on les compare à celle stocker dans la base de donnée.

![Base de donnée](https://cdn.discordapp.com/attachments/1081227920770596865/1130757698221256754/Capture_decran_2023-07-18_a_08.55.44.png)
![Page d'accueil](https://cdn.discordapp.com/attachments/1081227920770596865/1130757696342208572/Capture_decran_2023-07-18_a_08.52.58.png)
![Page description d'un livre](https://cdn.discordapp.com/attachments/1081227920770596865/1130757696790990949/Capture_decran_2023-07-18_a_08.53.22.png)
![Page d'ajout de livre](https://cdn.discordapp.com/attachments/1081227920770596865/1130757697906688050/Capture_decran_2023-07-18_a_08.53.55.png)

## Droits d’auteurs et informations sur la licence.

Réaliser par Vincent K/BIDI.

©2000 [Openclassroom](https://openclassrooms.com/fr/), Inc. Tout droit réservés.

![Openclassroom](https://camo.githubusercontent.com/e47c349811ac404b8147bd362c598e61c7d20225df17499c6373b44f6ee08a3d/68747470733a2f2f31746f3170726f67726573732e66722f77702d636f6e74656e742f75706c6f6164732f323031392f30352f6f70656e636c617373726f6f6d732d65313535373736313233363135382e706e67)
