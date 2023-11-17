import jwt from "jsonwebtoken";

export const jwtHelper = async (
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
