# imagem base Node.js
FROM node:18-alpine
WORKDIR /app

# instala dependências
COPY package*.json ./
RUN npm install --production

# copia código-fonte
COPY . .

# expõe porta da API
EXPOSE 3001

# variável de ambiente
ENV NODE_ENV=production

# inicia o servidor
CMD ["node", "server.js"]