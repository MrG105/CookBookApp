import React, { useEffect, useState } from 'react';
import { QUERY_ME } from '../../utils/queries';

// 
// Recipe Model: authorName (string), content(string, required), image(not yet), recipeName(string)
// TODO
// add ingredients (array? seperate model?)
// 


import { useMutation, useQuery } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';

function RecipeForm () {    
    const { data } = useQuery(QUERY_ME);
    const [recipeFormData, setUserFormData] = useState({ content: '', image: '', recipeName: ''});

    const [saveRecipe, {error}] = useMutation(ADD_RECIPE)
    // image hooks
  
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    console.log('recipeFormData3', recipeFormData)
  }, [recipeFormData])

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
    console.log('url', file.secure_url)
    console.log('recipeFormData', recipeFormData)
    setUserFormData({...recipeFormData, image: file.secure_url})
    console.log('recipeFormData2', recipeFormData)
    setLoading(false)
  }

    const handleInputChange = (event) => {
      if(event.target.name === 'image') {
        uploadImage(event);
        console.log(event.target)
      } else {
        const { name, value} = event.target;
        setUserFormData({ ...recipeFormData, [name]: value });
        
        console.log(recipeFormData,'hello')
      }
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      
      console.log(recipeFormData);
      

      try {
        const { data } = await saveRecipe({
          variables: {input: recipeFormData}
        });
        console.log(data, "WORKED")
        return data
      } catch (err) {
        console.log('error', )
        console.log(recipeFormData)
  
      }
    setUserFormData({     
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
              
            </form>
            <div className="col-lg-10 text-center image">
              <h3 className="text-center"> Upload Image</h3>
              <input type="file"
                name="image"
                placeholder="Upload an Image"
                onChange={handleInputChange}
              />
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <img src={recipeFormData.image} style={{ width: '300px' }} />
              )}
            </div>
            <hr />
              <button type="button" className="btn-primary" onClick={handleFormSubmit}>Submit</button>
              <hr />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}


export default RecipeForm;