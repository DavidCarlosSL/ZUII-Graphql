import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Track } from "./track.model";
import { User } from "./user.model";

export interface IPurchase {
    id_purchase?: number;
    value_purchase?: number;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    trackId?: number;
}

@Entity({name: 'purchase'})
export class Purchase {
    @PrimaryColumn({
        type: 'int',
        primary: true,
        generated: 'increment',
        name: 'id_purchase'
    })
    id_purchase: number;

    @Column({
        type: 'decimal',
        width: 5.2,
        nullable: false,
        default: 0,
        name: 'value_purchase'
    })
    value_purchase: number;

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

    @ManyToOne(type => Track)
    @JoinColumn({name: 'trackId', referencedColumnName: 'id_track'})
    trackId: Track;

    @ManyToOne(type => User)
    @JoinColumn({name: 'userId', referencedColumnName: 'id_user'})
    userId: User;
}