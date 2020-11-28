import "reflect-metadata";
import { ApolloServer } from 'apollo-server';
import { dbConnFactory } from './database/db';

import schema from './graphl/index';

const port = 3000;
const server = new ApolloServer({
    schema,
    context: ({req}) => {
        const context = {
            req,
            token: req.headers.authorization
        }
        return context
    }
});

dbConnFactory().then(() => {
    console.log("Success Database Connection");
    server.listen(port).then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
}).catch((err) => {
    console.log({message: 'Problems to connect the Database', error: err})
});