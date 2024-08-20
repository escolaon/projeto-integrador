import { defineEventHandler, readBody, createError } from 'h3';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RegisterBody {
  nome: string;
  email: string;
  senha: string;
}

export default defineEventHandler(async (event) => {
  try {
    // Lê o corpo da requisição
    const body = await readBody<RegisterBody>(event);

    // Validação dos campos obrigatórios
    if (!body.nome || !body.email || !body.senha) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: nome, email, and senha are required',
      });
    }

    const { nome, email, senha } = body;

    // Verifica se o email já está cadastrado
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already in use',
      });
    }

    // Criptografa a senha
    const hashedPassword = await hash(senha, 10);

    // Cria o novo usuário
    const newUser = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        celular: "",
        tipo: "admin"
      },
    });

    return {
      message: 'User created successfully',
      user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
    };
    } catch (error: any) {
      // Tratamento de erro
      return {
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Internal Server Error',
      };
    }
});
