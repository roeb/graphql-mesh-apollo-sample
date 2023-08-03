import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import bodyParser from "body-parser";
import { PubSub } from "graphql-subscriptions";

const PORT = 3500;
const pubsub = new PubSub();

const typeDefs = `
    type Query {
        books: [Book]
    }

    type Subscription {
        commentAdded: Comment
    }

    type Mutation {
        addComment(bookId: ID!, content: String!): Comment
    }

    type Book {
        id: ID!
        title: String
        author: String
    }

    type Comment {
        id: ID!
        content: String
    }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addComment(parent, { bookId, content }, { postController }) {
      pubsub.publish("COMMENT_ADDED", {commentAdded: { id: bookId, content: content }});
      return { id: bookId, content: content };
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(["COMMENT_ADDED"]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server)
);

httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
  );
});

const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];
