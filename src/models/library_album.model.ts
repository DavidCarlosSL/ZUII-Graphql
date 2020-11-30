import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Album } from "./album.model";
import { Library } from "./library.model";
import { LibraryTrack } from "./library_track.model";

import { AlbumSchema } from "../graphql/schemas/album.schema";

export interface ILibraryAlbum {
    id_library_album?: number;
    libraryId?: number;
    albumId?: AlbumSchema;
}

@Entity({name: 'library_album'})
export class LibraryAlbum {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_library_album'
    })
    id_library_album: number;

    @OneToMany(type => LibraryTrack, libraryTrack => libraryTrack.libraryAlbumId)
    libraryTracks: LibraryTrack[];

    @ManyToOne(type => Library)
    @JoinColumn({name: 'libraryId', referencedColumnName: 'id_library'})
    libraryId: Library;

    @ManyToOne(type => Album)
    @JoinColumn({name: 'albumId', referencedColumnName: 'id_album'})
    albumId: Album;
}