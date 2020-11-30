import { Column, Entity, PrimaryColumn } from "typeorm";

export interface IGenre {
    id_genre?: number;
    name_genre?: string;
}

@Entity({name: 'genre'})
export class Genre {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_genre'
    })
    id_genre: number;

    @Column({
        type: 'varchar',
        length: '100',
        nullable: false,
        unique: true,
        name: 'name_genre'
    })
    name_genre: string;
}