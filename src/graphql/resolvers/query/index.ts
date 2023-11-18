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
    await prisma.user.findMany(),
};
