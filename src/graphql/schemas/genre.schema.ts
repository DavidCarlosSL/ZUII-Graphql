import { Field, ID, ObjectType } from "type-graphql";

import { IGenre } from "../../models/genre.model";

@ObjectType()
export class GenreSchema implements IGenre {
    @Field(type => ID)
    id_genre: number;

    @Field()
    name_genre: string;
}