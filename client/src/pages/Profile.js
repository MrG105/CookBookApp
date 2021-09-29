import React from 'react' 
import RecipeList from '../components/RecipeList'
import User from '../server/models/User'
////NOTE MODELED AFTER MINI PROJ 14//
const Profile = () => {
    return(
<div>

  <div class="row">
  <div class="col-auto">
    <h2>Welcome, {User.username}!</h2>
  </div>
</div>

<div class="row mt-4">
  <div class="col-md-6">
      <h2>{RecipeList}</h2>
    <h3>Create a New Recipe:</h3>

    <form class="form new-project-form">
      <div class="form-group">
        <label for="project-name">Recipe name:</label>
        <input class="form-input" type="text" id="project-name" name="project-name" />
      </div>
  
      <div class="form-group">
        <label for="project-desc">description of recipe:</label>
        <textarea class="form-input" id="project-desc" name="project-desc"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>



</div>
</div>
)
}