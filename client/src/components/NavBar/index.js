import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="flex-row">
                <li className="mx-2">
                    <Link to="/">Home</Link>
                </li>
                <li className="mx-2">
                    <Link to="/recipeList">Recipe List</Link>
                </li>
                <li className="mx-2">
                    <Link to="/addRecipe">New Recipe</Link>
                </li>
                <li className="mx-2">
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;