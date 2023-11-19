import { authMutation } from "./auth";
import { postMutation } from "./post";

export const Mutation = {
  ...authMutation,
  ...postMutation,
};
