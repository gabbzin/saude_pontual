#Arquivo de dockerfile primeiro estagio de build somente das dependencias de produção
#Estagio 1
FROM node:18-alpine AS build

# Definindo o diretório de trabalho
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

#Estagio 2
FROM node:18-alpine



WORKDIR /app

# Copia apenas o necessario para produção
COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "server.js"]