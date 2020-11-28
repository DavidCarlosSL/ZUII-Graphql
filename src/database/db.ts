import { ConnectionOptions, createConnection } from 'typeorm';
import { User } from '../models/user.model';

const connParams: ConnectionOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    database: 'zuiiDB',
    name: 'zuiiDB',
    entities: [
        User
    ],
    synchronize: false,
    logging: true
};

export const dbConnFactory = () => {
    return createConnection({
        ...connParams,
        name: "default"
    }).catch((err) => {
        console.dir(err);
        console.dir(connParams);
        console.log(`DB conn err: ${err}`);
        throw err;
    });   
};