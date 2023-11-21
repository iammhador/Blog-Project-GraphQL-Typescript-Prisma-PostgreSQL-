import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUsers = async (ids: readonly number[]): Promise<User[]> => {
  const mutableIds = [...ids];

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: mutableIds,
      },
    },
  });

  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => userData[id]);
};

export const loader = new DataLoader<number, User>(batchUsers);
