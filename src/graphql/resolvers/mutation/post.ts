import { checkUserAndPost } from "../../../utils/checkUserAndPost";

export const postMutation = {
  addPost: async (parent: any, { post }: any, { prisma, token }: any) => {
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

    if (!post.title || !post.content) {
      return {
        message: "Title & Content not found!",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userId,
      },
    });

    return {
      message: "New post created!",
      post: result,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, token }: any) => {
    if (!(await token)) {
      return {
        message: "Unauthorized!",
        post: null,
      };
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      return {
        message: "User Id not found!",
        post: null,
      };
    }

    const error = await checkUserAndPost(prisma, userId, args.postId);

    if (error) {
      return error;
    }

    const result = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      message: "Post updated successfully!",
      post: result,
    };
  },

  deletePost: async (parent: any, args: any, { prisma, token }: any) => {
    if (!(await token)) {
      return {
        message: "Unauthorized!",
        post: null,
      };
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      return {
        message: "User Id not found!",
        post: null,
      };
    }

    const error = await checkUserAndPost(prisma, userId, args.postId);

    if (error) {
      return error;
    }

    const result = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      message: "Post deleted successfully!",
      post: result,
    };
  },

  publishedPost: async (parent: any, args: any, { prisma, token }: any) => {
    if (!(await token)) {
      return {
        message: "Unauthorized!",
        post: null,
      };
    }

    const decodedToken = await token;
    const userId = decodedToken.userId;

    if (!userId) {
      return {
        message: "User Id not found!",
        post: null,
      };
    }

    const error = await checkUserAndPost(prisma, userId, args.postId);

    if (error) {
      return error;
    }

    const result = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      message: "Post published successfully!",
      post: result,
    };
  },
};
