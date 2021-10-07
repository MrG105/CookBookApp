import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_RECIPE } from "../utils/queries";



const EditRecipe = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const recipes = data?.me.savedRecipes || [];

}

export default EditRecipe;