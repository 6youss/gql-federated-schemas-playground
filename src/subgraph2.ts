import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type User @key(fields: "id") {
    id: ID!
    products(param: String): [Product]!
  }

  type Product {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  User: {
    __resolveReference(user) {
      return { id: "1", username: "@ava", otherfield: "sqdqsd" };
    },
    products: (parent, input, ctx) => {
      console.log({ parent, input, ctx });
      return [{ id: "1", name: "Product1" }];
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Note the top level await!
const { url } = await startStandaloneServer(server, { listen: { port: 4002 } });
console.log(`🚀  Server ready at ${url}`);
