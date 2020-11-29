import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Album } from "./album.model";
import { LibraryTrack } from "./library_track.model";

export interface ITrack {
    id_track?: number;
    name_track?: string;
    duration_ms?: string;
    price?: number;
    albumId?: number;
}

@Entity({name: 'track'})
export class Track {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_track'
    })
    id_track: number;

    @Column({
        type: 'varchar',
        length: '100',
        nullable: false,
        name: 'name_track'
    })
    name_track: string;

    @Column({
        type: "varchar",
        length: "7",
        nullable: false,
        name: 'duration_ms'
    })
    duration_ms: string;

    @Column({
        type: 'float',
        width: 3.2,
        nullable: false,
        default: 0.2,
        name: 'price'
    })
    price: number;

    @OneToMany(type => LibraryTrack, libraryTrack => libraryTrack.trackId)
    trackLibraries: LibraryTrack[];

    @ManyToOne(type => Album)
    @JoinColumn({name: 'albumId', referencedColumnName: 'id_album'})
    albumId: Album;
}