import { gql } from 'graphql-tag';

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
        token
        user {
            _id
            username
        }
    }
}
`

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`

export const ADD_RECIPE = gql`
mutation addRecipe($input: saveRecipe) {
    addRecipe(input: $input) {
        _id
        author
        content
        image
        recipeName
    }
}
`
export const EDIT_RECIPE = gql`
mutation editRecipe($input: editRecipe) {
    editRecipe(input: $input) {
        _id
        username
        email
        savedRecipes {
            _id
            author
            content
            image
            recipeName
        }
    }
}
`

export const REMOVE_RECIPE = gql` 
mutation removeRecipe($recipeId: String!) {
        removeRecipe(recipeId: $recipeId) {
            _id
        }
}
`