import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers = {
  Query: {
    me(parent, input, ctx) {
      ctx.addshit = "qsdqsd";
      return { id: "1", username: "@ava", zidlo3afssa: "sqdqsd" };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Note the top level await!
const { url } = await startStandaloneServer(server, { listen: { port: 4001 } });
console.log(`🚀  Server ready at ${url}`);
