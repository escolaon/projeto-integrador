# Caso de uso: Envio de Notificação

## Professor
 - No dashboard do professor
 - Clica no menu de ocorrências
 - Clica no botão de adicionar ocorrência
 - Escolhe a turma
 - Seleciona os Alunos
 - Envia a ocorrência
 - É montado um objeto com a ocorrência e enviado para o sistema
 
## Sistema
 - O sistema recebe as ocorrências a serem processadas
 - O sistema verifica se o aluno já tem uma notificação pendente de envio
 - se o aluno não tem, o sistema cria uma e adiciona a ocorrência
 - se o aluno já tem, o sistema adiciona a ocorrência na notificação existente
 
## Coordenador
 - Clica no menu lateral em Notificações
 - Tem a opção de ver todas as notificações pendentes de envio ou as enviadas
 - É exibido uma lista de todas as notificações pendentes de envio
 - seleciona se quer enviar todas ou escolher individualmente
 - Envia as notificações
 - É montado um objeto com todas as notificações selecionadas e enviado para o sistema
 
## Sistema
 - O sistema recebe as notificações a serem enviadas
 - O sistema envia as notificações para o WhatsApp dos alunos
 - O sistema marca as notificações como enviadas

