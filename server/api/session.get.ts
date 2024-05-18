import { getServerSession } from '#auth';
import { PrismaClient, Usuario } from '@prisma/client';
import { H3Event } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get server session
    const session = await getServerSession(event);

    // Check if session and email exist
    if (!session?.user?.email) {
      return null;
    }

    const { email } = session.user;

    // Find user by email
    const usuario: Usuario | null = await prisma.usuario.findUnique({
      where: { email },
    });

    // Return null if user not found
    if (!usuario) {
      return null;
    }

    // Return user data
    return usuario;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw new Error('Failed to fetch session');
  }
});
