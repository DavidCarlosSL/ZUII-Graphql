import { Field, ObjectType } from "type-graphql";

import { IUser } from "../../models/user.model";

import { UserSchema } from "./user.schema";

interface IAuth {
    token: string;
    user: IUser;
}

@ObjectType()
class Auth implements IAuth {
    @Field({nullable: false})
    token: string;

    @Field({nullable: false})
    user: UserSchema
}

export default Auth;