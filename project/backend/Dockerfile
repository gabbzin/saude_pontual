# imagem base Node.js
FROM node:22-alpine as deps

WORKDIR /app

# instala dependências
COPY package*.json ./
RUN npm install --production

# estágio de build
FROM node:22-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# estágio final
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
# se precisar de arquivos estáticos, adicione COPY extra

EXPOSE 3001
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
