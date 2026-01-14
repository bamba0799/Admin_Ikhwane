# Étape 1 : Build de l'application (utilise Node pour compiler TypeScript et build React)
FROM node:20-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances pour installer les packages
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Build de l'app (compile TS en JS et génère le build statique)
RUN npm run build

# Étape 2 : Serveur de production (utilise Nginx pour servir les fichiers statiques)
FROM nginx:stable-alpine

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 (port par défaut de Nginx)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]