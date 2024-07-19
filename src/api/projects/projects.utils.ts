import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const checkProjectOwnerShip = async (userId: string, id: string) => {
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    return { status: 404, message: 'Project not found' };
  }
  if (existingProject.userId !== userId) {
    return { status: 403, message: 'Forbidden' };
  }

  return { status: 200, message: '' };
};

export default checkProjectOwnerShip;
