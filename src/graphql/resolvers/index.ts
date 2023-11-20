import { Query } from "./query/index";
import { Mutation } from "./mutation/index";
import { User } from "./relation/user";
import { Profile } from "./relation/profile";
import { Post } from "./relation/post";

export const resolvers = {
  Query,
  User,
  Profile,
  Post,
  Mutation,
};
