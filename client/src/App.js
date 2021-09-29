import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeForm from './components/RecipeForm';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Route exact path="/addRecipe" component={RecipeForm} />
          
        </Switch>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
