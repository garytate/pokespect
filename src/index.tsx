import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI,
  cache: new InMemoryCache()
});

// const client = ...

client
  .query({
    query: gql`
      query samplePokeAPIquery {
				pokemon_v2_pokemonspecies {
					name
					id
				}
			}
    `
  })
  .then(result => console.log(result));



ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
