# imagem base Node.js
# agora com dois estagios
FROM node:22-alpine as deps

WORKDIR /app

# instala dependências
COPY package*.json ./
RUN npm install --production


#estagio 2
FROM node:22-alpine

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# copia código-fonte
COPY . .

# expõe porta da API
EXPOSE 3001

# variável de ambiente
ENV NODE_ENV=production

# inicia o servidor
CMD ["node", "server.js"]
