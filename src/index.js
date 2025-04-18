import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client"
import App from './App';
import reportWebVitals from './reportWebVitals';




const client= new ApolloClient({
  uri:"https://localhost:7103/graphql/",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json"
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
