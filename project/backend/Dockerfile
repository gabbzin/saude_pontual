# imagem base Node.js
FROM node:18-slim

RUN apt-get update && \
    apt-get install -y python3 build-essential --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

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