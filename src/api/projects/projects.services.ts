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
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });
  if (!existingProject) {
    throw new Error('Project not found');
  }
  const data: Partial<project> = {};
  if (input.title !== undefined) {
    data.title = input.title;
  }
  if (input.description !== undefined) {
    data.description = input.description;
  }
  if (input.images !== undefined && input.images.length > 0) {
    const newImages = [...existingProject.images, ...input.images];
    if (JSON.stringify(newImages) !== JSON.stringify(existingProject.images)) {
      data.images = newImages;
    }
  }
  if (input.links !== undefined && input.links.length > 0) {
    const newLinks = [...existingProject.links, ...input.links];
    if (JSON.stringify(newLinks) !== JSON.stringify(existingProject.links)) {
      data.links = newLinks;
    }
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
