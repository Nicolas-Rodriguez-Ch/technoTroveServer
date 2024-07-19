import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
interface user {
  fullName: string;
  email: string;
  password: string;
  description: string;
  contactInfo: string[];
  profilePicture?: string;
}

const prisma = new PrismaClient();

export const getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      fullName: true,
      email: true,
      description: true,
      contactInfo: true,
      profilePicture: true,
      Project: {
        select: {
          id: true,
          active: true,
          title: true,
          description: true,
          images: true,
          links: true,
        },
        where: {
          active: true,
        },
      },
    },
  });
};

export const createUser = async (input: user) => {
  const {
    fullName,
    email,
    password,
    description,
    contactInfo,
    profilePicture,
  } = input;

  try {
    return prisma.user.create({
      data: {
        fullName,
        email,
        password,
        description,
        contactInfo,
        profilePicture,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Email already exists');
    } else {
      throw error;
    }
  }
};

export const updateUser = async (id: string | undefined, input: user) => {
  const {
    fullName,
    email,
    password,
    description,
    contactInfo,
    profilePicture,
  } = input;
  const encPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      email: email && { set: email },
      password: encPassword && { set: encPassword },
      fullName: fullName && { set: fullName },
      description: description && { set: description },
      contactInfo: contactInfo && { set: contactInfo },
      profilePicture: profilePicture && { set: profilePicture },
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      Project: {
        select: {
          id: true,
          active: true,
          title: true,
          description: true,
          images: true,
          links: true,
        },
        where: {
          active: true,
        },
      },
    },
  });
};

export const deleteUser = async (id: string) => {
  await prisma.project.deleteMany({
    where: {
      userId: id,
    },
  });
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

export const getUserProfile = async (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      description: true,
      contactInfo: true,
      profilePicture: true,
      Project: {
        select: {
          id: true,
          active: true,
          title: true,
          description: true,
          images: true,
          links: true,
        },
        where: {
          active: true,
        },
      },
    },
  });
};
