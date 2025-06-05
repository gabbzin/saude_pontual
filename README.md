# Saúde Pontual

Sistema web para agendamento de consultas médicas e gerenciamento de pacientes.

## Tecnologias Utilizadas

- Frontend: React  
- Backend: Node.js / Express  
- Banco de Dados: PostgreSQL  
- Docker: para conteinerização e execução dos serviços

<img src="https://skillicons.dev/icons?i=vscode,git,github,css,js,react,nodejs,postgresql,docker" />

---

## O que é necessário para usar?

Para rodar o sistema no seu computador, é necessário instalar um programa chamado **Docker**. Ele ajuda a colocar tudo no ar sem complicação.


## Pré-requisitos

- **Docker**  
  - [Docker Desktop (Windows/Mac)](https://www.docker.com/products/docker-desktop/)  
  - [Docker Engine (Linux)](https://docs.docker.com/engine/install/)

---

## Variáveis de Ambiente

Crie os seguintes arquivos com base nos exemplos abaixo:

### backend/.env

```env
JWT_CHAVE=sua_chave_secreta_aqui
```

> Para gerar a chave:
```bash
openssl rand -hex 32
```

### backend/.env.db

```env
DB_USER=usuario_do_banco_de_dados
DB_HOST=db
DB_NOME=saude_pontual
DB_SENHA=sua_senha_aqui
DB_PORT=5432
```

---

## Como rodar o projeto

1. Clone o repositório e navegue até o diretório `saude_pontual/project`.

2. Crie os arquivos `.env` e `.env.db` conforme indicado acima e coloque-os nas localizações:

```
saude_pontual/project/backend/.env  
saude_pontual/project/backend/.env.db
```

3. Construa e inicie os serviços Docker:

```bash
docker compose up --build
```

4. Acesse a aplicação em:

```
http://localhost:8080
```

---
