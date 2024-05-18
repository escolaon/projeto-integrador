Usuario
    id: autoincrement
    nome: string
    email: string
    senha: string
    celular: string
    tipo: enum (admin, coordenador, professor, responsavel, aluno)

Escola
    id: autoincrement    
    coordenador: Usuario (coordenador)
    nome: string
    celular: string

Turma
    id: autoincrement
    escola: Escola

    professores
    disciplinas
    turmas
    alunos
    ocorrencias
    notificacoes

turmas
    escola
    alunos
    disciplinas

disciplinas
    usuario: professor
    turmas
    ocorrencias

alunos
    turma

    ocorrencias

ocorrencias
    disciplina
    aluno
    notificacoes

notificacoes
    ocorrencias
    aluno