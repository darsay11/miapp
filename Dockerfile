FROM node:18-alpine

WORKDIR /app

# Copiar package.json del backend
COPY backend/package*.json ./backend/

# Instalar dependencias
WORKDIR /app/backend
RUN npm ci

# Copiar código fuente
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 5000

# Iniciar aplicación
CMD ["npm", "start"]
