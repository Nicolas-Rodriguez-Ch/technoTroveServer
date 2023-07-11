import { PrismaClient, Prisma } from "@prisma/client";
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
      Project: true,
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
      error.code === "P2002"
    ) {
      throw new Error("Email already exists");
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
  
};