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

  type Profile {
    id: ID!
    bio: String!
    user: User
    createdAt: String!
  }

  type Mutation {
    register (
        name: String!
        email: String!
        password: String!
        bio: String
    ): AuthPayload

    login (
        email: String!
        password: String!
    ): AuthPayload

    addPost (
     post: PostInput!
    ): PostPayload

    updatePost (
     postId: ID!
     post: PostInput
    ): PostPayload

    deletePost (
      postId: ID!
    ): PostPayload

    publishedPost (
      postId: ID!
    ): PostPayload

  }

  type Query {
    users: [User]
    profile: [Profile]
    singleUserProfile: Profile
    posts: [Post]
    singleUserPosts: [Post]
  }

  type AuthPayload {
    message: String
    token: String
  }

  type PostPayload {
    message: String
    post: Post
  }

  input PostInput {
    title: String
    content: String
  }
`;
