import React, { useState } from 'react';

function RecipeForm () {
    const [name, setName] = useState('');
    const [recipe, setRecipe] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'name') {
            setName(inputValue)
        } else {
            setRecipe(inputValue)
        }

        
    }

    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
        if(!name) {
            setErrorMessage('Please Name Your Recipe')
            return;
        }
        setName('');
        setRecipe('');

        
  };

  return (
    <section>
      <div className="container my-auto">
        <div className="row">
          <div >
            <h1 className="margin-top text-center">New Recipe </h1>
            <hr className="mx-auto" />
            <p className="text-center"> {name}</p>
            <form className="form col-lg-10 mx-auto text-center ">
            <input
                value={name}
                name="name"
                onChange={handleInputChange}
                type="text"
                placeholder="What are we cookin?"
              />
              <textarea
                value={recipe}
                name="recipe"
                onChange={handleInputChange}
                type="text"
                placeholder="How are we cookin?"
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
