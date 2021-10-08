import gql from 'graphql-tag';

export const QUERY_RECIPES = gql`
query QUERY_RECIPES {
    recipes {
       _id
       author
       content
       image
       recipeName
    }
}
`;

export const QUERY_RECIPE = gql`
 query QUERY_RECIPE {
     recipe {
        _id
        author
        content
        image
        recipeName
     }
 }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username){
            _id
            username
            email
            recipes {
                _id
                recipeText
            }
        }
    }
`;

export const QUERY_ME = gql`
    query GET_ME    {
        me{
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
`;

export const QUERY_ME_BASIC = gql`
{
    me {
        _id
        username
        email
    }
}
`;