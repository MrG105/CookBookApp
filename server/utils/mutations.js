import { gql } from '@apollo/client';

export const CREATE_RECIPE = gql`
  mutation createRecipe($user1: String!, $user2: String!) {
    createRecipe(user1: $user1, user2: $user2) {
      _id
      user1
      user2
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($_id: String!, $techNum: Int!) {
    createUser(_id: $_id, techNum: $techNum) {
      _id
      user1
      user2
      user1_recipe
      user2_recipe
    }
  }
`;
