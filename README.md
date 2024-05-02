# Projeto Integrador I

Este projeto é uma aplicação web inovadora destinada a facilitar a comunicação entre escolas e pais, permitindo o envio automático de notificações via WhatsApp sobre a frequência dos alunos. Utiliza uma arquitetura robusta baseada em Nuxt.js, emprega sqLite como banco de dados gerenciado pelo Prisma, e integra uma API para o envio de mensagens através do WPPConnect. O design do frontend é desenvolvido com Tailwind.css e Ui-Thing para uma experiência de usuário fluida e responsiva.

## Instalação

Antes de começar a instalação, é essencial preparar seu ambiente de desenvolvimento com as ferramentas necessárias. As instruções a seguir guiarão você através do processo de instalação das ferramentas e da configuração inicial do projeto.

### Ferramentas Necessárias:

- **Git**: Ferramenta fundamental para controle de versões e colaboração em projetos de software.
  - [Instalar Git](https://git-scm.com/download/)

- **Nvm**: Permite gerenciar múltiplas instalações do Node.js, facilitando testes e desenvolvimento em diferentes versões.
  - [Instalar Nvm para Linux e macOS](https://github.com/nvm-sh/nvm)
  - [Instalar Nvm para Windows](https://github.com/coreybutler/nvm-windows)

### Configuração do Git

Configurar o Git é um passo crucial para garantir que todas as suas contribuições sejam devidamente atribuídas a você:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### Adicionando SSH Key ao GitHub

Para um processo de colaboração mais seguro e sem a necessidade de autenticação frequente, adicione uma chave SSH ao seu perfil no GitHub:

1. **Criar uma chave SSH** no terminal. Isso irá gerar uma nova chave SSH, usada para autenticar suas sessões Git:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "seu-email@exemplo.com"
   ```
   Siga as instruções no terminal para salvar a chave no local padrão e, opcionalmente, defina uma senha para maior segurança.

2. **Copie a chave pública** para sua área de transferência:
   ```bash
   cat ~/.ssh/id_rsa.pub | clip
   ```
   No macOS, use `pbcopy < ~/.ssh/id_rsa.pub` e no Linux, instale `xclip` ou `xsel` para permitir que você copie para a área de transferência.

3. **Adicione a chave ao GitHub**:
   - Acesse [GitHub SSH and GPG keys](https://github.com/settings/keys)
   - Clique em "New SSH Key", nomeie sua chave e cole o conteúdo no campo apropriado.
   - Confirme a adição clicando em "Add SSH Key".

### Clonando e Configurando o Repositório

Obtenha uma cópia local do código-fonte e prepare seu próprio ramo para começar a trabalhar:

```bash
git clone git@github.com:mauriciobellon/projeto-integrador-1.git
cd projeto-integrador-1
git checkout -b feature/<seuNome>
```

### Configurando o Node.js e Instalando Dependências

Utilize o Nvm para instalar e usar a versão apropriada do Node.js, garantindo compatibilidade com as dependências do projeto:

```bash
nvm install 18
nvm use 18
npm install
```

### Configuração do Prisma

Inicialize o Prisma para gerenciar a base de dados, garantindo que o

 modelo de dados esteja correto e que as migrações sejam aplicadas:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Execução do Projeto

Compile e execute o projeto localmente para ver a aplicação em ação:

```bash
npm run build
npm run dev
```

Acesse `http://localhost:3000` em seu navegador para ver a aplicação rodando.
