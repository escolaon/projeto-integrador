# Projeto Integrador

Bem-vindo ao Projeto Integrador, uma aplicação web inovadora destinada a facilitar a comunicação entre escolas e pais. Nossa solução permite o envio automático de notificações via WhatsApp sobre a frequência dos alunos, proporcionando uma experiência integrada e eficiente para todos os usuários.

Agora, acompanhe o desempenho escolar de alunos através de um acesso esxclusivo para responsáveis.

## Visão Geral

Este projeto utiliza uma arquitetura robusta baseada em Nuxt.js, com um banco de dados sqLite gerenciado pelo Prisma. Integramos a API do WPPConnect para o envio de mensagens, e o frontend é desenvolvido com TailwindCSS e Ui-Thing para uma experiência de usuário fluida e responsiva.

## Funcionalidades Principais

- **Envio Automático de Notificações via WhatsApp**: Comunicação rápida e eficiente entre escola e pais.
- **Gestão de Ocorrências**: Professores podem adicionar ocorrências e o sistema processa e envia notificações.
- **Dashboard para Coordenadores**: Gerencie e envie notificações pendentes.
- **Acesso para Responsáveis**: Acompanhe o desempenho escolar do aluno.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- **Git**: Controle de versões e colaboração em projetos.
  - [Instalar Git](https://git-scm.com/download/)
- **NVM (Node Version Manager)**: Gerencia múltiplas versões do Node.js.
  - [Instalar NVM para Linux e macOS](https://github.com/nvm-sh/nvm)
  - [Instalar NVM para Windows](https://github.com/coreybutler/nvm-windows)

## Configuração do Ambiente

### Configuração do Git

Configure o Git para garantir que suas contribuições sejam devidamente atribuídas:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### Adicionando Chave SSH ao GitHub

Para uma colaboração mais segura e sem a necessidade de autenticação frequente, adicione uma chave SSH ao seu perfil no GitHub:

1. **Criar uma Chave SSH**:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "seu-email@exemplo.com"
   ```
   Siga as instruções no terminal para salvar a chave no local padrão e, opcionalmente, defina uma senha para maior segurança.

2. **Copiar a Chave Pública** para a área de transferência:
   ```bash
   cat ~/.ssh/id_rsa.pub | clip
   ```
   - No macOS: `pbcopy < ~/.ssh/id_rsa.pub`
   - No Linux: Instale `xclip` ou `xsel` para copiar para a área de transferência.

3. **Adicionar a Chave ao GitHub**:
   - Acesse [GitHub SSH and GPG keys](https://github.com/settings/keys)
   - Clique em "New SSH Key", nomeie sua chave e cole o conteúdo no campo apropriado.
   - Confirme a adição clicando em "Add SSH Key".

### Clonando e Configurando o Repositório

Obtenha uma cópia local do código-fonte e prepare seu ambiente de desenvolvimento:

```bash
git clone git@github.com:mauriciobellon/projeto-integrador-1.git
cd projeto-integrador-1
git checkout -b feature/<seuNome>
```

### Configurando o Node.js e Instalando Dependências

Utilize o NVM para instalar e usar a versão apropriada do Node.js:

```bash
nvm install 20
nvm use 20
npm install
```

### Configuração do Prisma

Inicialize o Prisma para gerenciar o banco de dados e aplicar migrações:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Execução do Projeto

Compile e execute o projeto localmente:

```bash
npm run build
npm run dev
```

Acesse `http://localhost:3000` no seu navegador para visualizar a aplicação em execução.

## Contribuindo

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para a branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.

## Diretrizes de Contribuição
 - Código Limpo: Siga as boas práticas de programação.
 - Commits Descritivos: Use mensagens de commit claras e descritivas.
 - Pull Requests: Detalhe as mudanças realizadas e o motivo.

## Roadmap
 - Versão 2.0: Integração com outras plataformas de mensagens.
 - Funcionalidade X: Descrição da nova funcionalidade planejada.
 - Melhorias de UX/UI: Planejamento para melhorar a experiência do usuário.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).