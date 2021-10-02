import React, { useState } from 'react';


// 
// Recipe Model: authorName (string), content(string, required), image(not yet), recipeName(string)
// TODO
// add ingredients (array? seperate model?)
// 


import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';


function RecipeForm () {
    const [recipeFormData, setUserFormData] = useState({ author: '', content: '', image: '', recipeName: ''});

    const [saveRecipe, {error}] = useMutation(ADD_RECIPE)
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
    console.log(file.url)

    setImage(file.secure_url)
    setLoading(false)
  }
    

    const handleInputChange = (event) => {
      if(event.target.name === 'image') {
        uploadImage(event)
      }
      
      const { name, value } = event.target;
      setUserFormData({ ...recipeFormData, [name]: value });
      
      console.log(recipeFormData,'hello')
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
        console.log(recipeFormData)
  
      }
    setUserFormData({
      recipeId: '',
      author: '',
      content: '',
      image: '',
      recipeName: ''
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
                value={recipeFormData.content}
                className="form-input-recipe"
                name="content"
                onChange={handleInputChange}
                type="text"
                placeholder="How are we cookin it?"
                cols="100"
                rows="20"
              />
              <hr />
              <button type="button" className="btn-primary" onClick={handleFormSubmit}>Submit</button>
              <hr />
            </form>
            <div className="col-lg-10 text-center image">
              <h3 className="text-center"> Upload Image</h3>
              <input type="file"
                value={recipeFormData.image}
                name="image"
                placeholder="Upload an Image"
                onChange={handleInputChange}
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