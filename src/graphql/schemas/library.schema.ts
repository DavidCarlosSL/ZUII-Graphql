import { Field, ID, ObjectType } from "type-graphql";

import { ILibrary } from "../../models/library.model";
import { LibraryAlbumSchema } from "./libraryAlbum.schema";

@ObjectType()
export class LibrarySchema implements ILibrary {
    @Field(type => ID)
    id_library: number;
    
    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(type => [LibraryAlbumSchema], {nullable: true})
    libraryAlbums?: LibraryAlbumSchema[];
}