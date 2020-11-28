import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserService from '../../services/user.service';

import UserSchema from '../schemas/user.schema';

@injectable()
@Resolver(of => UserSchema)
class UserResolvers {
    constructor(@inject("UserService") private userService: UserService) {}

    @Query(returns => UserSchema)

    @Mutation(returns => UserSchema, {name: 'Login', nullable: true})
    async getUserByEmailAndPassword(@Arg('user_email', {nullable: false}) user_email: string, @Arg('user_password', {nullable: false}) user_password: string): Promise<UserSchema>{
        const userResponse = await this.userService.getUserByEmailAndPassword(user_email, user_password);
        return userResponse;
    }
}

export default UserResolvers;