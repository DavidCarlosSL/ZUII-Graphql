import { Field, ID, ObjectType } from "type-graphql";
import { IUser } from "../../models/user.model";

@ObjectType()
class UserSchema implements IUser {
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

export default UserSchema;