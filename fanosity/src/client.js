import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
    uri: "https://dev-next-api.fanosity.com/graphql"
});