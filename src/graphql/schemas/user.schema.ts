import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IUser } from "../../models/user.model";

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