import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { LibraryAlbum } from "./library_album.model";

import { User } from "./user.model";

export interface ILibrary {
    id_library?: number;
    user?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

@Entity({name: "library"})
export class Library {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: false,
        name: 'id_library'
    })
    id_library: number;

    @Column({
        type: 'datetime',
        nullable: false,
        name: "createdAt"
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        name: "updatedAt"
    })
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn({name: 'userId', referencedColumnName: 'id_user'})
    user: User | number;

    @OneToMany(type => LibraryAlbum, libraryAlbum => libraryAlbum.libraryId)
    libraryAlbums: LibraryAlbum[];
}