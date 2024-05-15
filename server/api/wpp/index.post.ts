import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);

  const aluno = body.aluno;
  const celular = body.celular;
  const mensagem = "Olá {{ responsavel }}, o aluno {{ aluno }} não participou das aulas {{ ocorrencias }} hoje. Retorne este contato para falar com a coordenação da escola caso tenha alguma dúvida."


  

})
