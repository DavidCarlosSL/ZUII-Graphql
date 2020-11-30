import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Max, Min } from 'class-validator';

import { IUser } from "../../models/user.model";

import { PurchaseSchema } from "./purchase.schema";

@ObjectType()
export class UserSchema implements IUser {
    @Field(type => ID)
    id_user: number;

    @Field()
    name_user: string;

    @Field()
    email_user: string;

    @Field()
    password_user: string;

    @Field()
    quantity_coins: number;

    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;

    @Field(type => [PurchaseSchema], {nullable: true})
    purchases?: PurchaseSchema[];
}

@InputType({description: "Add User"})
export class AddUserInput implements Partial<UserSchema> {
    @Field(type => String, {nullable: false})
    name_user: string;

    @Field(type => String, {nullable: false})
    email_user: string;

    @Field(type => String, {nullable: false})
    password_user: string;
}

@InputType({description: "Update User Coins"})
export class UpadteUserCoinsInput implements Partial<UserSchema> {
    @Field(type => Number, {nullable: false})
    @Max(1000)
    @Min(1)
    quantity_coins: number;
}