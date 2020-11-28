import { Column, Entity, PrimaryColumn } from "typeorm";
import * as moment from 'moment';

export interface IUser {
    userId?: number;
    userName?: string;
    userEmail?: string;
    userPassword?: string;
    userCoins?: number;
    createdAt?: Date;
    updatedAt?: Date;
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
        name: "createdAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        name: "updatedAt",
        default: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    })
    updatedAt: Date;
}