const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedRecipes: [Recipe]
  }

  type Recipe {
    _id: ID
    author: String
    content: String
    image: String
    recipeName: String
  }

  input saveRecipe {
    author: String
    content: String
    image: String
    recipeName: String
  }

  input editRecipe {
    content: String
    image: String
    recipeName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    recipes: [Recipe]
    recipe(_id: ID): Recipe
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    addRecipe(input: saveRecipe): Recipe
    removeRecipe(recipeId: String!):Recipe
    editRecipe(_id: ID, input: editRecipe): Recipe

  }
`;

module.exports = typeDefs;