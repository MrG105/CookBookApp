import React, { useState } from 'react';


// 
// Recipe Model: authorName (string), content(string, required), image(not yet), recipeName(string)
// TODO
// add ingredients (array? seperate model?)
// 


import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';


function RecipeForm() {
  const [recipeName, setName] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ingredients, setIngredients] = useState('');
  // image hooks
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // upload image api call, might need to refactor into graphql style
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'cookbookimages')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dtopu3von/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()


    setImage(file.secure_url)
    setLoading(false)
  }


  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'recipeName') {
      setName(inputValue)
    } else if (inputType === 'ingredients') {
      setIngredients(inputValue)
    } else
      setContent(inputValue)
  }




  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    if (!recipeName) {
      setErrorMessage('Please Name Your Recipe')
      return;
    }
    setName('');
    setIngredients('');
    setContent('');


  };
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

            <div className="image">
              <h3> Upload Image</h3>
              <input type="file"
                name="file"
                placeholder="Upload an Image"
                onChange={uploadImage}
              />
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <img src={image} style={{ width: '300px' }} />
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default RecipeForm;
