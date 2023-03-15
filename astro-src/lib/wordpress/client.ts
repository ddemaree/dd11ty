import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
} from "@apollo/client/core";

export { gql } from "@apollo/client/core";

function getWpAuthString() {
  const username = import.meta.env["WP_USER"];
  const password = import.meta.env["WP_PASSWORD"];
  const authString = Buffer.from(username + ":" + password).toString("base64");

  return authString;
}

/*
ApolloClient singleton for WP requests
*/
function getApolloClient() {
  const uri = `${
    process.env.WP_URL || "https://demareedotme.wpengine.com"
  }/graphql`;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
      useGETForQueries: true,
      headers: {
        Authorization: `Basic ${getWpAuthString()}`,
      },
    }),
  });
}

/*
Helper function wrapping ApolloClient
*/
export async function gqlRequest(query: DocumentNode, variables: any = {}) {
  const client = getApolloClient();
  return client.query({ query, variables });
}
