import { Field, ID, ObjectType } from "type-graphql";

import { ILibraryTrack } from "../../models/library_track.model";

import { TrackSchema } from "./track.schema";

@ObjectType()
export class LibraryTrackSchema implements ILibraryTrack {
    @Field(type => ID)
    id_library_track: number;

    @Field()
    trackId: TrackSchema;
}