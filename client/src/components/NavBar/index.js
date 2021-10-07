import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
function NavBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar">
      <div>
        <ul className="flex-row">
          {Auth.loggedIn() ? (
            <>
              <li className="mx-2">
                <Link to="/">My Recipes</Link>
              </li>
              <li className="mx-2">
                <Link to="/recipeList">Recipe Search</Link>
              </li>
              <li className="mx-2">
                <Link to="/addRecipe">Create New Recipe</Link>
              </li>
              <li className="mx-2" onClick={logout}>
                <Link to="/">Logout</Link>
              </li>
            </>
          ) : (
            <>
              
                <Link className="mx-2" to="/">Home</Link>
        
              
                <Link className="mx-2" to="/login">
                  Login
                </Link>
              
                <Link className="mx2" to="/signup">
                  Signup
                </Link>
             
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
