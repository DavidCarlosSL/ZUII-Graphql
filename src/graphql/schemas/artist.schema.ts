import { Field, ID, ObjectType } from "type-graphql";

import { IArtist } from "../../models/artist.model";
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
}