import { PrismaClient } from "@prisma/client";

interface project {
  title: string;
  description: string;
  userId: string;
  images: string[];
  links: string[];
}

const prisma = new PrismaClient();

export const getAllProjects = () => {
  return prisma.project.findMany();
};

export const createProject = (input: project) => {
  const { title, description, userId, images, links } = input;
  return prisma.project.create({
    data: {
      title,
      description,
      userId,
      images,
      links
    },
  });
};
