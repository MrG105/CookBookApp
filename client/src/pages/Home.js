// import React from 'react';

// const Home = () => {
//     return (
//         <div>Hello!</div>
//     );
// };

// export default Home;

// TODO
// Add useEffect to reload on delete
// use React-bootstrap stuff maybe

import React from "react";
import RecipeList from "../components/RecipeList";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_RECIPE } from "../utils/mutations";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const recipes = data?.me.savedRecipes || [];
  console.log(recipes);
  const loggedIn = Auth.loggedIn();
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE);

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if(!token) {
    //   console.log("this")
    //   return false;
    // }

    try {
      const {data} = await removeRecipe({
        variables: { recipeId: recipeId },
      });

    } catch(e) {
      console.log(e);
    }
  }
  if (loading) {
    return <h1>loading</h1>
  }
  return (
    <div>
      <h2>Your Recipes</h2>
      {recipes.length ? (
        <div className="flex-row justify-space-between mb-4 p-2">
          {recipes.map((recipe) => {
            return(
            <div key={recipe._id} border='dark' className="flex-row">
           <div className="card"> 
             <div className="card-body">
              <h5 className="card-title">Recipe Name: {recipe.recipeName}</h5>
              <p className="card-text">How to make: {recipe.content}</p>
              <p className="card-text">Author: {recipe.author}</p>
              <img src={recipe.image} alt={recipe.image}></img>
              <button className="btn bg-danger" onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
             </div>
             </div>
             </div>
             );
})}
        </div>
  ) : (
    <h3>You haven't added any products yet!</h3>
      )}
     
    </div>
    
  );
};

export default Home;