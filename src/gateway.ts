import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: "subgraph1", url: "http://localhost:4001" },
    { name: "subgraph2", url: "http://localhost:4002" },
  ],
});

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string

const gateway = new ApolloGateway({
  supergraphSdl,
});

// Pass the ApolloGateway to the ApolloServer constructor

const server = new ApolloServer({
  gateway,
});

// Note the top-level `await`!
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀  Server ready at ${url}`);
