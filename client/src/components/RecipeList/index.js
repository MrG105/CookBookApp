import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Auth from '../../utils/auth';

import { QUERY_ME } from '../../utils/queries';

import { useQuery, useMutation } from '@apollo/client';

const RecipeList = ({ recipes,}) => {
  if(!recipes.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return(
    <>
    <Jumbotron fluid className='text-light bg-dark'>
      <Container>
        <h1>Viewing saved books!</h1>
      </Container>
    </Jumbotron>
    <Container>
      <h2>
        {recipes.length
          ? `Viewing ${recipes.length} saved ${recipes.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <CardColumns>
        {recipes.map((recipe) => {
          return (
            <Card>
              {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.recipeName}`} variant='top' /> : null}
              <Card.Body>
                <Card.Title></Card.Title>
                <p className='small'>Authors: {recipe.author}</p>
                <Card.Text></Card.Text>
                
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  </>
  )
}

export default RecipeList;

