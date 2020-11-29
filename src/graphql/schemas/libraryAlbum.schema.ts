import { Field, ID, ObjectType } from "type-graphql";

import { ILibraryAlbum } from "../../models/library_album.model";

import { AlbumSchema } from "./album.schema";
import { LibraryTrackSchema } from "./libraryTrack.schema";

@ObjectType()
export class LibraryAlbumSchema implements ILibraryAlbum {
    @Field(type => ID)
    id_library_album: number;

    @Field()
    albumId: AlbumSchema;

    @Field(type => [LibraryTrackSchema], {nullable: true})
    libraryTracks?: LibraryTrackSchema[];
}