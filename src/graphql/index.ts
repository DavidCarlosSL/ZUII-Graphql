import { buildSchemaSync } from "type-graphql";

import container from "../services/container";
import AlbumResolver from "./resolvers/album.resolver";
import ArtistResolver from "./resolvers/artist.resolver";
import LibraryResolver from "./resolvers/library.resolver";
import PurchaseResolver from "./resolvers/purchase.resolver";

import UserResolver from "./resolvers/user.resolver";

import { AlbumSchema } from "./schemas/album.schema";
import { ArtistSchema } from "./schemas/artist.schema";
import { GenreSchema } from "./schemas/genre.schema";
import { LibrarySchema } from "./schemas/library.schema";
import { LibraryAlbumSchema } from "./schemas/libraryAlbum.schema";
import { PurchaseSchema } from "./schemas/purchase.schema";
import { TrackSchema } from "./schemas/track.schema";
import { UserSchema } from "./schemas/user.schema";

const schema = buildSchemaSync({
    resolvers: [UserSchema, UserResolver, GenreSchema, ArtistSchema, ArtistResolver, AlbumSchema, AlbumResolver, TrackSchema, LibrarySchema, LibraryResolver, LibraryAlbumSchema,
    PurchaseSchema, PurchaseResolver],
    container: container
})

export default schema;