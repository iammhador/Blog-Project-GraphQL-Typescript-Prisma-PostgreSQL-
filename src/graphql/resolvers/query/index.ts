interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
  token?: string;
  message?: string;
}

export const Query = {
  users: async (parent: any, args: RegisterInfo, { prisma }: any) =>
    await prisma.user.findMany({}),

  singleUser: async (
    parent: any,
    args: RegisterInfo,
    { prisma, token }: any
  ) => {
    if (!(await token)) {
      throw new Error("Unauthorized!");
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      throw new Error("User Id not found!");
    }

    const userPosts = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return userPosts;
  },

  profile: async (parent: any, args: RegisterInfo, { prisma }: any) =>
    await prisma.profile.findMany({}),

  singleUserProfile: async (
    parent: any,
    args: RegisterInfo,
    { prisma, token }: any
  ) => {
    if (!(await token)) {
      throw new Error("Unauthorized!");
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      throw new Error("User Id not found!");
    }

    const userPosts = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    return userPosts;
  },

  posts: async (parent: any, args: RegisterInfo, { prisma }: any) =>
    await prisma.post.findMany({}),

  singleUserPosts: async (
    parent: any,
    args: RegisterInfo,
    { prisma, token }: any
  ) => {
    if (!(await token)) {
      throw new Error("Unauthorized!");
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      throw new Error("User Id not found!");
    }

    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return userPosts;
  },
};
