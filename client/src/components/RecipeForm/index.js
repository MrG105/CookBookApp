import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';


function RecipeForm () {
    const [recipeFormData, setUserFormData] = useState({ recipeId: '', author: '', content: '', image: '', recipeName: ''});
    const [saveRecipe, {error}] = useMutation(ADD_RECIPE)

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...recipeFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      try {
        const { data } = await saveRecipe({
          variables: {...recipeFormData}
        });

        return data
      } catch (err) {
        console.log('error')
      }
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    }        
  

  return (
    <>
    <section>
      <div className="container my-auto">
        <div className="row">
          <div >
            <h1 className="margin-top text-center">New Recipe </h1>
            <hr className="mx-auto" />
            <h3 className="text-center"> {recipeFormData.recipeName}</h3>
            <form className="form col-lg-10 mx-auto text-center ">
            <input
                value={recipeFormData.recipeName}
                className="form-input"
                name="recipeName"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we cookin?"
              />
              <hr />
              <textarea
                value={recipeFormData.ingredients}
                className="form-input-recipe"
                name="ingredients"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we usin?"
                cols="50"
                rows="20"
              />
              <textarea
                value={recipeFormData.content}
                className="form-input-recipe"
                name="recipe"
                onChange={handleInputChange}
                type="text"
                placeholder="How are we cookin it?"
                cols="100"
                rows="20"
              />
              <hr />
              <button type="button" className="btn-primary" onClick={handleFormSubmit}>Submit</button>
            </form>
            
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default RecipeForm;
