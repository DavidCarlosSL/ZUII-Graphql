import { buildSchemaSync } from "type-graphql";

import container from "../services/container";
import ArtistResolver from "./resolvers/artist.resolver";

import UserResolver from "./resolvers/user.resolver";
import { ArtistSchema } from "./schemas/artist.schema";
import { GenreSchema } from "./schemas/genre.schema";

import UserSchema from "./schemas/user.schema";

const schema = buildSchemaSync({
    resolvers: [UserSchema, UserResolver, GenreSchema, ArtistSchema, ArtistResolver],
    container: container
})

export default schema;