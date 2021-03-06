import { gql } from "apollo-server-express";

const typeDefs = gql`
  type AuthPayload {
    user: User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    logout: Boolean
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;
