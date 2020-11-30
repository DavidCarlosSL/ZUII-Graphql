import { Field, ID, ObjectType } from "type-graphql";

import { ITrack } from "../../models/track.model";

@ObjectType()
export class TrackSchema implements ITrack {
    @Field(type => ID)
    id_track: number;

    @Field()
    name_track: string;

    @Field()
    duration_ms: string;

    @Field()
    price: number;
}