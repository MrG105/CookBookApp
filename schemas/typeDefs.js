const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
  }

  type Recipe {
    _id: ID!
    user1: String!
    user2: String!
    user1_votes: Int
    user2_votes: Int
  }

  type Query {
    user: [User]
    recipe(_id: String): [Recipe]
  }

  type Mutation {
    createRecipe(user1: String!, user2: String!): Recipe
    createUser(_id: String!, userNum: Int!): Recipe
  }
`;

module.exports = typeDefs;
