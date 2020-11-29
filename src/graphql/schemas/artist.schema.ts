import { Field, ID, ObjectType } from "type-graphql";

import { IArtist } from "../../models/artist.model";

import { AlbumSchema } from "./album.schema";
import { GenreSchema } from "./genre.schema";

@ObjectType()
export class ArtistSchema implements IArtist {
    @Field(type => ID)
    id_artist: number;

    @Field()
    name_artist: string;

    @Field()
    image_artist: string;

    @Field(type => [GenreSchema], {nullable: true})
    genres?: GenreSchema[];

    @Field(type => [AlbumSchema], {nullable: true})
    albums?: AlbumSchema[];
}