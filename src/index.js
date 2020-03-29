import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";


const startServer = async () => {
    const app = express();

    app.get('/rest-endpoint', function (req, res) {

        return res.send({
            success: 'Hello World!'
        })
    })

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers 
    });

    server.applyMiddleware({ app });

    await mongoose.connect('mongodb://localhost/cobalt', {useNewUrlParser: true, useUnifiedTopology: true});

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer();