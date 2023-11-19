export const checkUserAndPost = async (
  prisma: any,
  userId: any,
  postId: any
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    return {
      message: "User not found!",
      post: null,
    };
  }

  const isPostExist = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  if (!isPostExist) {
    return {
      message: "post not found!",
      post: null,
    };
  }

  if (isPostExist.authorId != isUserExist.id) {
    return {
      message: "Post not owned by user!",
      post: null,
    };
  }
};
