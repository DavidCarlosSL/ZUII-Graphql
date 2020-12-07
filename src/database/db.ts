import { ConnectionOptions, createConnection } from 'typeorm';

import { Album } from '../models/album.model';
import { Artist } from '../models/artist.model';
import { Genre } from '../models/genre.model';
import { Library } from '../models/library.model';
import { LibraryAlbum } from '../models/library_album.model';
import { LibraryTrack } from '../models/library_track.model';
import { Purchase } from '../models/purchase.model';
import { Track } from '../models/track.model';
import { User } from '../models/user.model';

const connParams: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE,
    name: process.env.DB_DATABASE,
    entities: [
        User,
        Library,
        Genre,
        Artist,
        Album,
        Track,
        Purchase,
        LibraryAlbum,
        LibraryTrack
    ],
    synchronize: true,
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