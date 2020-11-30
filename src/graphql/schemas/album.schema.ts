import { Field, ID, ObjectType } from "type-graphql";

import { IAlbum } from "../../models/album.model";

import { GenreSchema } from "./genre.schema";
import { TrackSchema } from "./track.schema";

@ObjectType()
export class AlbumSchema implements IAlbum {
    @Field(type => ID)
    id_album: number;

    @Field()
    name_album: string;

    @Field()
    image_album: string;

    @Field()
    release_date: string;

    @Field()
    release_date_precision: string;

    @Field(type => [GenreSchema], {nullable: true})
    genres?: GenreSchema[];

    @Field(type => [TrackSchema], {nullable: true})
    tracks?: TrackSchema[];
}