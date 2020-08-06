import { getApolloClient } from "./Client";
import { DocumentNode } from "graphql";

export const fetchUsers = (gqlQeury: DocumentNode) => {
    const apolloClient = getApolloClient();
    return apolloClient.query({ query: gqlQeury }).then((res) => {
        return res.data;
    });
};