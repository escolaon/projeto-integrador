# Univesp - Projeto Integrador I

Instalar
    Docker-Destop
    Docker-Compose
    Node.js
    Git

Autorize o Git a acessar o seu repositório
Instale o Node.js

Clone o repositório




Este projeto é uma aplicação web que permite que as escolas enviem notificações aos pais via WhatsApp sobre a frequência dos alunos. A aplicação possui uma arquitetura baseada em Node.js, com um banco de dados sqLite, uma API para envio de mensagens via WhatsApp utilizando o WPPConnect, e um backend desenvolvido em Node.js com Express.js, Prisma. O frontend é construído com Vue.js, Vue-Router, Vite, Tailwind.css e Pinia.

Para instalar e executar o projeto, siga os seguintes passos:

1. Instale o Docker Desktop: [link para a documentação](https://docs.docker.com/engine/install/)
2. Instale o Docker Compose: [link para a documentação](https://docs.docker.com/compose/install/)
3. Instale o Node.js: [link para o site oficial](https://nodejs.org/en/)
4. Autorize o Git a acessar o seu repositório
5. Clone o repositório para a sua máquina
6. Crie um novo branch com o nome da funcionalidade que você está trabalhando: `git checkout -b nome-da-funcionalidade`
7. Crie um arquivo `.env` baseado no arquivo `.env.example`
8. Execute o comando `docker-compose up --build` para iniciar a aplicação
9. Acesse a aplicação no seu navegador através do endereço http://localhost:5000
10. Faça login com o usuário e senha padrão: admin / admin

A estrutura de arquivos do projeto é a seguinte:


## Architecture
 - Docker - Containerization

 - Database - Postgres

 - WPPConnect - API to send messages via WhatsApp

 - Backend - Node.js + Express.js + Prisma + Nodemon + concurrently
 
 - Frontend - Vue.js + Vue-Router + Vite + Tailwind.css + Pinia

### Prerequisites

Make sure you have the below installed on your machine.

- [x] **Docker** : https://docs.docker.com/engine/install/
- [x] **Docker-Compose** : https://docs.docker.com/compose/install/
- [x] **Node** : https://nodejs.org/en/

## File Structure:
```bash

.github
    |-- workflows
    |   |-- main.yml

backend
    |-- src
    |   |-- controllers
    |   |-- models
    |   |-- routes
    |   |-- app.js
    |-- Dockerfile
    |-- package.json
    |-- package-lock.json

database
    |-- Dockerfile
    |-- schema.sql
    |-- seed.sql

frontend
    |-- public
    |-- src
    |   |-- components
    |   |-- views
    |   |-- app.vue
    |-- Dockerfile
    |-- package.json
    |-- package-lock.json

wppconnect
    |-- Dockerfile
    |-- package.json
    |-- package-lock.json

.env.example
.gitignore
docker-compose.yml
README.md
LICENSE

```

## Installation

Install Git

Install Docker

Install Docker Compose

Clone the repository

Create a new branch with the name of the feature you are working on

git checkout -b feature-name

Create a .env file based on the .env.example file

Run the command docker-compose up --build

## 

## Usage

Access the application at http://localhost:5000

Login with the default user and password: admin / admin

