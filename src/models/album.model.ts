import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Artist } from "./artist.model";
import { Genre } from "./genre.model";
import { LibraryAlbum } from "./library_album.model";
import { Track } from "./track.model";

export interface IAlbum {
    id_album?: number;
    name_album?: string;
    image_album?: string;
    release_date_precision?: string;
    release_date?: string;
    artistId?: number;
}

@Entity({name: 'album'})
export class Album {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_album'
    })
    id_album: number;

    @Column({
        type: 'varchar',
        length: '100',
        nullable: false,
        name: 'name_album'
    })
    name_album: string;

    @Column({
        type: 'varchar',
        length: '100',
        name: 'image_album'
    })
    image_album: string;

    @Column({
        type: 'varchar',
        length: '10',
        name: 'release_date_precision'
    })
    release_date_precision: string;
    
    @Column({
        type: 'varchar',
        length: '25',
        name: 'release_date'
    })
    release_date: string;

    @OneToMany(type => Track, track => track.albumId)
    tracks: Track[];

    @OneToMany(type => LibraryAlbum, libraryAlbum => libraryAlbum.albumId)
    libraryAlbums: LibraryAlbum[];

    @ManyToOne(type => Artist)
    @JoinColumn({name: "artistId", referencedColumnName: 'id_artist'})
    artistId: Artist;

    @ManyToMany(type => Genre)
    @JoinTable({
        name: "album_genre",
        joinColumn: {name: "id_album", referencedColumnName: "id_album"},
        inverseJoinColumn: {name: "id_genre", referencedColumnName: "id_genre"}
    })
    genres: Genre[];
}