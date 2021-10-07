import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_RECIPE } from "../utils/queries";
import { Link, useParams } from 'react-router-dom';
import { EDIT_RECIPE } from "../utils/mutations";
import Home from "./Home";

const EditRecipe = () => {

    const { loading, data } = useQuery(QUERY_RECIPE);

    const { id } = useParams();
    const [updateRecipe, setRecipeData] = useState({ content: '', image: '', recipeName: ''});
    console.log("mark", data);
    const [oldData, setOldData] = useState({ content: '', image: '', recipeName: ''})
    // setOldData({content:data.recipe.content, image: data.recipe.image, recipeName: data.recipe.recipeName})
  const [editRecipe, {error}] = useMutation(EDIT_RECIPE);  
  const handleInputChange = (event) => {
      console.log(data, "rest")
      const { name, value } = event.target;
      setRecipeData({ ...updateRecipe, [name]: value });
      console.log(updateRecipe,'hello')

  };  
  const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(updateRecipe, 'form data');
        try {
          const { data } = await editRecipe({
            variables: { input: updateRecipe}
          });
          console.log(data, "WORKED")
          setRecipeData({     
            content: '',
            image: '',
            recipeName: ''
          });
          window.location.assign('/');
          return data
        } catch (err) {
          console.log('error', )
          console.log(setRecipeData)
        }
      if (loading) {
          return <h2>Loading...</h2>
      }
    }
    return (
        <>
    <section>
      <div className="container my-auto">
        <div className="row">
          <div className="text-center" >
            <h1 className="margin-top text-center">New Recipe </h1>
            <hr className="mx-auto" />
            <h3 className="text-center">Recipe Name: {updateRecipe.recipeName}</h3>
            <form className="form col-lg-10 mx-auto text-center ">

            <input
                value={updateRecipe.recipeName}
                className="form-input"
                name="recipeName"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we cookin?"
              />
              <hr />
              {/* <textarea
                value={recipeFormData.ingredients}
                className="form-input-recipe"
                name="ingredients"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we usin?"
                cols="50"
                rows="20"

              />*/}
              <hr />

              <textarea
                value={updateRecipe.content}
                className="form-input-recipe"
                name="content"
                onChange={handleInputChange}
                type="text"
                placeholder=""
                cols="50"
                rows="20"
              />

              <hr />

              <textarea
                value={updateRecipe.image}
                className="form-input-recipe"
                name="image"
                onChange={handleInputChange}
                type="text"
                placeholder="How are we cookin it?"
                cols="500"
                rows="20"
              />
              
            </form>
          
            <hr />
              <button type="button" className="btn-primary" onClick={handleFormSubmit}>Submit</button>
              <hr />
          </div>
        </div>
      </div>
    </section>
    </>
    )
}
export default EditRecipe;