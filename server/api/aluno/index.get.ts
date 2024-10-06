import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { type: userType, email: userEmail } = getQuery(event);

    let response;

    if (userType === 'responsavel') {
      response = await prisma.aluno.findMany({
        where: {
          emailResponsavel: userEmail,
        },
      });
    } else {
      response = await prisma.aluno.findMany();
    }

    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
    return {
      status: 500,
      body: error.message || "Internal Server Error",
    };
  }
});
