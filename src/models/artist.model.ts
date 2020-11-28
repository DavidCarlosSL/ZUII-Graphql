import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

import { Album } from "./album.model";
import { Genre } from "./genre.model";

export interface IArtist {
    id_artist?: number;
    name_artist?: string;
    image_artist?: string;
}

@Entity({name: 'artist'})
export class Artist {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_artist'
    })
    id_artist: number;

    @Column({
        type: 'varchar',
        length: '100',
        nullable: false,
        unique: true,
        name: 'name_artist'
    })
    name_artist: string;
    
    @Column({
        type: 'varchar',
        length: '100',
        nullable: false,
        name: 'image_artist'
    })
    image_artist: string;

    @OneToMany(type => Album, album => album.id_album)
    albums: Album[];

    @ManyToMany(type => Genre)
    @JoinTable({
        name: "artist_genre",
        joinColumn: {name: "id_artist", referencedColumnName: "id_artist"},
        inverseJoinColumn: {name: "id_genre", referencedColumnName: "id_genre"}
    })
    genres: Genre[];
}