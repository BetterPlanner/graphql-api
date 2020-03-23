import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";


const startServer = async () => {

    const server = new ApolloServer({ typeDefs, resolvers });

    await mongoose.connect('mongodb://localhost/cobalt', {useNewUrlParser: true, useUnifiedTopology: true});

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}

startServer();