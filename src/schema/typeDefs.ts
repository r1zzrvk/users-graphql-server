import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Email

  type Query {
    user(id: ID!): User!
    users(skip: Int = 0, limit: Int = 10, filter: UsersFilterInput): UsersResult!
  }

  input UsersFilterInput {
    search: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteUsers(ids: [ID!]!): [User!]!
  }

  type User {
    id: ID!
    email: Email!
    name: String!
  }

  input CreateUserInput {
    email: Email!
    name: String!
  }

  input UpdateUserInput {
    email: Email
    name: String
  }

  type UsersResult {
    users: [User!]!
    totalCount: Int!
  }
`

export default typeDefs
