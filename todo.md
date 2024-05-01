# Precisamos Fazer
---
Autenticação do usuário

Integração com o banco de dados
Api para o Model Escola
    Post /escola
    Get /escola/:id
    Put /escola/:id
    Delete /escola/:id

Frontend para o Model Escola
    Cadastro de escola
    Edição de escola
    Exclusão de escola

Merge para a branch main

WhatsappConnect Server Middleware

Permissões de Usuários

## Telas de Cadastro
---
Cadastros:
    - Usuários
    - Escolas
    - Coordenadores
    - Professores
    - Responsáveis
    - Ocorrências
    - Turmas
    - Disciplinas
    - Alunos
    - Notificações
    - Configurações
        - Permissões



## Casos de Uso

Primeiro acesso dos coordenadores
    - Entra no site e na landing page acessa o link de primeiro acesso
    - Preenche o formulário com o nome, e-mail e senha.
    - Recebe um e-mail de confirmação
    - Clica no link de confirmação
    - É redirecionado para a página de login
    - Faz login com o e-mail e senha cadastrados
    - É redirecionado para a página de cadastro de escola
    - Preenche o formulário com os dados da escola com Nome, CNPJ e Celular
    - Clica em salvar
    - É redirecionado para a dashboard da escola

Coodenador faz cadastro de Disciplinas
    - Entra na dashboard da escola
    - Clica no menu de disciplinas
    - Clica no botão de adicionar disciplina
    - Preenche o formulário com os dados da disciplina com Nome e Descrição
    - Clica em salvar
    - É redirecionado para a lista de disciplinas

Coodenador faz cadastro de professores
    - Entra na dashboard da escola
    - Clica no menu de professores
    - Clica no botão de adicionar professor
    - Preenche o formulário com os dados do professor com Nome, Celular e Disciplinas
    - Clica em salvar
    - É redirecionado para a lista de professores

Coodenador faz cadastro de turmas
    - Entra na dashboard da escola
    - Clica no menu de turmas
    - Clica no botão de adicionar turma
    - Preenche o formulário com os dados da turma com Nome, Ano, Período, Turno e Disciplinas
    - Clica em salvar
    - É redirecionado para a lista de turmas

Coodenador faz cadastro de alunos
    - Entra na dashboard da escola
    - Clica no menu de alunos
    - Clica no botão de adicionar aluno
    - Preenche o formulário com os dados do aluno com Nome e Turma
    - Clica em salvar
    - É redirecionado para a lista de alunos

Coodenador faz cadastro de responsáveis
    - Entra na dashboard da escola
    - Clica no menu de responsáveis
    - Clica no botão de adicionar responsável
    - Preenche o formulário com os dados do responsável com Nome, Celular e Alunos
    - Clica em salvar
    - É redirecionado para a lista de responsáveis

Professor cria ocorrência
    - Entra na dashboard da escola
    - Clica no menu de ocorrências
    - Clica no botão de adicionar ocorrência
    - Preenche o formulário com os dados da ocorrência com Aluno, Tipo, Data e Descrição
    - Clica em salvar
    - É redirecionado para a lista de ocorrências

Coordenador envia notificação
    - Entra na dashboard da escola
    - Clica no menu de notificação
    - Clica no botão de enviar notificações
    - Revisa as ocorrencias de todos os alunos
    - Seleciona os alunos que deseja enviar a notificação
    - Clica em enviar
    - É redirecionado para a lista de mensagens enviadas