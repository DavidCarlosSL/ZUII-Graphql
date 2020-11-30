import { Field, ObjectType } from "type-graphql";

import { ILibrary } from "../../models/library.model";
import { IUser } from "../../models/user.model";
import { LibrarySchema } from "./library.schema";
import { UserSchema } from "./user.schema";

interface INewUser {
    user: IUser,
    library: ILibrary
}

@ObjectType()
export class NewUser implements INewUser {
    @Field({nullable: false})
    library: LibrarySchema;
    
    @Field({nullable: false})
    user: UserSchema;
}