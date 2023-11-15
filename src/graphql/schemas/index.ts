export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    createdAt: String!
    published: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    post: [Post]
    createdAt: String!
  }

  type Mutation {
    register (
        name: String!
        email: String!
        password: String!
    ): User
  }

  type Profile {
    id: ID!
    bio: String!
    user: User
    createdAt: String!
  }

  type Query {
    posts: [Post]
    users: [User]
    profile: [Profile]
  }
`;
