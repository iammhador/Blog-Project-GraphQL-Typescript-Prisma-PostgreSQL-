import bcrypt from "bcrypt";
import config from "../../../config";
import { JWTHelper } from "../../../utils/jwtHelper";

interface LoginInfo {
  email: string;
  password: string;
}

export const Mutation = {
  register: async (parent: any, args: any, { prisma }: any) => {
    const isEmailAlreadyExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (isEmailAlreadyExist) {
      return {
        message: "Email Address already exists!",
        token: null,
      };
    }

    const hashPass = await bcrypt.hash(args.password, 12);

    const createNewUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashPass,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: createNewUser.id,
        },
      });
    }

    const token = JWTHelper.generateToken(
      {
        userId: createNewUser.id,
        name: createNewUser.name,
        email: createNewUser.email,
        password: createNewUser.password,
      },
      config.jwt.secret as string,
      config.jwt.expiresIn as string
    );

    return {
      message: "User created successfully!",
      token,
    };
  },

  login: async (parent: any, args: LoginInfo, { prisma }: any) => {
    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!isEmailExist) {
      return {
        message: "Wrong email address!",
        token: null,
      };
    }

    const isPassMatch = await bcrypt.compare(
      args.password,
      isEmailExist.password
    );

    if (!isPassMatch) {
      return {
        message: "Wrong password!",
        token: null,
      };
    }

    const token = JWTHelper.generateToken(
      {
        userId: isEmailExist.id,
        name: isEmailExist.name,
        email: isEmailExist.email,
        password: isEmailExist.password,
      },
      config.jwt.secret as string,
      config.jwt.expiresIn as string
    );

    return {
      message: "User retrieved successfully!",
      token,
    };
  },

  post: async (parent: any, args: any, { prisma, token }: any) => {
    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!token) {
      return {
        message: "Unauthorized!",
        post: null,
      };
    }

    if (!userId) {
      return {
        message: "User id not found!",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        message: "Title & Content not found!",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userId,
      },
    });

     return {
      message: "New post created!",
      post: result,
    };
  },
};
