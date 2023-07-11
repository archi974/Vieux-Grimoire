# Vieux-Grimoire
Pour ce site, j'ai réaliser la partie back-end en Node.js Express.js et MongoDB. Ce site est un site de notation de livre

nodemon index pour lancer le serveur back

Création de la base de donnée :

Crée un compte sur [MongoDB](https://www.mongodb.com/)
Crée un projet sur MongoDB Atlas
Crée un cluster pour définir une route pour la base de donnée
Crée une base de donnée
Changer l'uri du cluster en ajoutant le nom de la base de donnée
Data access : définir un utilisateur avec les droits d'écriture et de lecture

PM2 à la place de nodemon en production pour plus de sécurité par exemple pour la mémoire RAM que j'utilise pour stocker provisoirement une image pour l'optimiser, cela évite les attaques de type Denial of Service (DoS)