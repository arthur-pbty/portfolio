# === Étape 1 : Build ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./

# Installer uniquement ce qu'il faut pour le build
RUN npm ci

# Copier tout le code
COPY . .

# Build Next.js pour la production
RUN npm run build

# === Étape 2 : Runner léger ===
FROM node:20-alpine AS runner

WORKDIR /app

# Copier uniquement ce qui est nécessaire pour la prod
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mode production
ENV NODE_ENV=production
EXPOSE 3000

# Lancer le serveur Next.js
CMD ["npm", "start"]