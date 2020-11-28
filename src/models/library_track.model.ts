import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { LibraryAlbum } from "./library_album.model";
import { Track } from "./track.model";

@Entity({name: 'library_track'})
export class LibraryTrack {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_library_track'
    })
    id_library_track: number;

    @ManyToOne(type => Track)
    @JoinColumn({name: 'trackId', referencedColumnName: 'id_track'})
    trackId: Track;

    @ManyToOne(type => LibraryAlbum)
    @JoinColumn({name: 'library_album_Id', referencedColumnName: 'id_library_album'})
    libraryAlbumId: LibraryAlbum;
}