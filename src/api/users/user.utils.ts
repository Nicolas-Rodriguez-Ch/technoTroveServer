import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkUserOwnership = async (userId: string, reqUserId: string) => {
  if (reqUserId !== userId) {
    return { status: 403, message: "Forbidden" };
  }

  const user = await prisma.user.findUnique({ where: { id: reqUserId } });
  if (!user) {
    return { status: 404, message: "User not Found" };
  }
  return { status: 200, message: "User authorized" };
};
