import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { JWTHelper } from "./utils/jwtHelper";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  token:
    | {
        userId: Number;
        name: String;
        email: String;
        password: String;
      }
    | string
    | JwtPayload
    | null;
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      const extractToken = req.headers.authorization;
      const token = JWTHelper.verifyToken(extractToken as string);
      return {
        prisma,
        token,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
