import { PrismaClient } from "@prisma/client";
import { SECRET } from "../../constants/secrets";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  id: string;
}

const prisma = new PrismaClient();
const secret = SECRET;
const tokenExpirationTime = "90d";

export const login = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
export const signToken = (payload: any): string => {
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpirationTime });
  return token;
};

export const verifyToken = (token: string): DecodedToken | false => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    return false;
  }
};
