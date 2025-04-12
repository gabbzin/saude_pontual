#Arquivo de dockerfile primeiro estagio de build somente das dependencias de produção
#Estagio 1
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .