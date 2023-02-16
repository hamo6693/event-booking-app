const express = require("express")
const {ApolloServer} = require("apollo-server-express") 
const {ApolloServerPluginDrainHttpServer} = require("apollo-server-core")
const http = require("http")
const {typeDefs} = require("./schema/index")
const {resolvers} = require("./resolvers/index")
require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/user")
const jwt = require("jsonwebtoken")


async function StartApolloServer(typeDefs,resolvers){
    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins:[ApolloServerPluginDrainHttpServer({httpServer})],
        context:async({req}) => {
            const auth = req ? req.headers.authorization : null
            if(null) {
                const decodedToken = jwt.verify(auth.slice(4),process.env.JWT_SECRET)
                const user = await User.findById(decodedToken.id)
                return {user}
            } 
        }
    })
    await server.start()
    server.applyMiddleware({app})
    await new Promise(resolve => httpServer.listen({port: process.env.PORT},resolve))
    console.log(`server ready at port:4000:${process.env.PORT}${server.graphqlPath}`);

    mongoose.connect(process.env.DB_URL,
        err => {
            if(err) throw err
            console.log("conected");
        }
    )

}
StartApolloServer(typeDefs,resolvers)