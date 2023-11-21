import { loader } from "../../../dataLoaders/useLoaders";

export const Post = {
  author: async (parent: any, args: any, { prisma }: any) => {
    return loader.load(parent.authorId);
    // return await prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });
  },
};
