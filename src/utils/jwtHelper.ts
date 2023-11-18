import jwt from "jsonwebtoken";
import config from "../config";

const generateToken = async (
  payload: {
    userId: number;
    name: string;
    email: string;
    password: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, config.jwt.secret as string);
  } catch (error) {
    return null;
  }
};

export const JWTHelper = {
  generateToken,
  verifyToken,
};
