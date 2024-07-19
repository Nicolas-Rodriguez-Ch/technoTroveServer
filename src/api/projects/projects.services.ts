import { PrismaClient } from '@prisma/client';

interface project {
  title: string;
  description: string;
  userId: string;
  images: string[];
  links: string[];
}

const prisma = new PrismaClient();

export const getAllProjects = () => {
  return prisma.project.findMany({
    where: {
      active: true,
    },
    select: {
      title: true,
      description: true,
      images: true,
      id: true,
      User: {
        select: {
          fullName: true,
        },
      },
    },
  });
};

export const createProject = (input: project) => {
  const { title, description, userId, images, links } = input;
  return prisma.project.create({
    data: {
      title,
      description,
      userId,
      images,
      links,
    },
  });
};

export const getProjectById = (id: string) => {
  return prisma.project.findFirst({
    where: {
      id,
      active: true,
    },
    select: {
      title: true,
      description: true,
      images: true,
      links: true,
      User: {
        select: {
          fullName: true,
          email: true,
          contactInfo: true,
          profilePicture: true,
        },
      },
    },
  });
};

export const updateProject = async (id: string, input: project) => {
  const data: Partial<project> = {};
  if (input.title !== undefined) {
    data.title = input.title;
  }
  if (input.description !== undefined) {
    data.description = input.description;
  }
  if (input.images !== undefined && input.images.length > 0) {
    data.images = input.images;
  }

  if (input.links !== undefined && input.links.length > 0) {
    data.links = input.links;
  }
  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProject = (id: string) => {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });
};
