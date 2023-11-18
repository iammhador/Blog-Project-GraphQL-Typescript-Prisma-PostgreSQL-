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
        bio: String
    ): AuthPayload
  }

  type Mutation {
    login (
        email: String!
        password: String!
    ): AuthPayload

    post (
      title: String!
      content: String!
    ): PostPayload
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

  type AuthPayload {
    message: String
    token: String
  }

  type PostPayload {
    message: String
    post: Post
  }
`;
