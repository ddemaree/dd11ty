// const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core')
// const { JSDOM } = require('jsdom')
// const fetch = require('cross-fetch')
// const { DateTime } = require('luxon')
// const {AssetCache} = require("@11ty/eleventy-cache-assets");

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   // Provide required constructor fields
//   cache: cache,
//   link: new HttpLink({ uri: 'https://demareeblog.wpengine.com/graphql', fetch })
// });

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://demareeblog.wpengine.com/graphql",
    cache: new InMemoryCache(),
});

export default client;