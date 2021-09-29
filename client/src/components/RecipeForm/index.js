import React, { useState } from 'react';

// 
// Recipe Model: authorName (string), content(string, required), image(not yet), recipeName(string)
// TODO
// add ingredients (array? seperate model?)
// image upload: later
// 



function RecipeForm () {
    const [recipeName, setName] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ingredients, setIngredients] = useState('');


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
        if(!recipeName) {
            setErrorMessage('Please Name Your Recipe')
            return;
        }
        setName('');
        setIngredients('');
        setContent('');

        
  };

  return (
    <section>
      <div className="container my-auto">
        <div className="row">
          <div >
            <h1 className="margin-top text-center">New Recipe </h1>
            <hr className="mx-auto" />
            <h3 className="text-center"> {recipeName}</h3>
            <form className="form col-lg-10 mx-auto text-center ">
            <input
                value={recipeName}
                name="recipeName"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we cookin?"
              />
              <hr />
              <textarea
                value={ingredients}
                name="ingredients"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we usin?"
                cols="50"
                rows="20"
              />
              <textarea
                value={content}
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
            {errorMessage && (
              <div>
                <p className="error-text">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeForm;
