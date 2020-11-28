import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Purchase } from "./purchase.model";

export interface IUser {
    id_user?: number;
    name_user?: string;
    email_user?: string;
    password_user?: string;
    quantity_coins?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

@Entity({name: 'user'})
export class User {
    @PrimaryColumn({
        type: 'int', 
        primary: true,
        generated: 'increment',
        name: 'id_user'
    })
    id_user: number;

    @Column({
        type: 'varchar',
        length: 80,
        nullable: false,
        name: 'name_user'
    })
    name_user: string;

    @Column({
        type: 'varchar',
        length: 120,
        nullable: false,
        name: 'email_user',
        unique: true
    })
    email_user: string;

    @Column({
        type: 'varchar',
        length: 32,
        nullable: false,
        name: 'password_user'
    })
    password_user: string;

    @Column({
        type: 'decimal',
        width: 6.2,
        nullable: false,
        default: 0,
        name: 'quantity_coins'
    })
    quantity_coins: number;

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

    @OneToMany(type => Purchase, purchase => purchase.id_purchase)
    purchases: Purchase[];
}