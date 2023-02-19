import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { ApolloClient, InMemoryCache,ApolloProvider, createHttpLink } from '@apollo/client';
import {setContext} from "@apollo/client/link/context"
const httpLink = createHttpLink({
  uri:"http://localhost:4000/graphql",
  credentials:"same-origin"
})
/*
const client = new ApolloClient({
  cache:new InMemoryCache(),
  link
})
*/
const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem("token");

  return{
    headers:{
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache:new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)


