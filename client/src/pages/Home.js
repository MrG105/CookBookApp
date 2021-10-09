
import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RECIPES } from "../utils/queries";
import { BOOKMARK } from "../utils/mutations";



const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const [bookmarkRecipe, {error}] = useMutation(BOOKMARK);

  const recipes = data?.recipes || [];
  console.log(recipes);
  // console.log("data", data.recipes);
  const loggedIn = Auth.loggedIn();

  const handleBookmarkRecipe = async (recipeId) => {
    console.log(recipeId, 'bookmark')
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    try {
      const {data} = await bookmarkRecipe({
        variables: { recipeId: recipeId },
      });
      window.location.assign('/Profile');
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(recipes.length) {
      const recipes = data?.recipes || [];
    }
  }, [recipes]);

  // const handleDeleteRecipe = async (recipeId) => {
  

  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   // if(!token) {
  //   //   console.log("this")
  //   //   return false;
  //   // }
    
  //   try {
  //     const {data} = await removeRecipe({
  //       variables: { recipeId: recipeId },
  //     });
  //     window.location.assign('/');
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }
  if (loading) {
    return <h1>loading</h1>
  }
  return (
    <div className="text-center">
      <h1>All Recipes</h1>
      <hr />
      {recipes.length ? (
        <div className="flex-row justify-space-between mb-4 p-2">
          {recipes.map((recipe) => {
            const recipeLink = "/EditRecipe/" + recipe._id
            // console.log(recipeLink.split('/'));
            return(
            <div key={recipe._id} border='dark' className="flex-row">
           <div className="card col-md-6"> 
             <div className="card-body">
              <h5 className="card-title text-uppercase fw-bold">Recipe Name: <br /> {recipe.recipeName}</h5>
              <hr />
              <p className="card-text">How to make: <br /> {recipe.content}</p>
              <p className="card-text">Author: <br /> {recipe.author}</p>
              <img src={recipe.image} alt={recipe.image}></img>
              <hr />
              <button className="btn-primary" onClick={() => handleBookmarkRecipe(recipe._id)}>Bookmark</button>
              

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