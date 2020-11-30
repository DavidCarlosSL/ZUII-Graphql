import { ApolloError } from 'apollo-server';
import { inject, injectable } from 'inversify';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';
import * as momentTz from 'moment-timezone';

import { UserSchema, AddUserInput, UpadteUserCoinsInput} from '../schemas/user.schema';
import { PurchaseSchema } from '../schemas/purchase.schema';
import { NewUser } from '../schemas/newUser.schema';
import Auth from '../schemas/auth.schema';

import UserService from '../../services/user.service';
import LibraryService from '../../services/library.service';

import { isAuth } from '../../middlewares/isAuth';

import {AuthPrivateKey, JwtPrivateKey} from '../../config/custom-environment-variables.json';

import { TContext } from '../../utils/interfaces/context.interface';

@injectable()
@Resolver(of => UserSchema)
class UserResolver {
    constructor(@inject("UserService") private userService: UserService, @inject("LibraryService") private libraryService: LibraryService) {}

    @UseMiddleware(isAuth)
    @Query(returns => [PurchaseSchema], {nullable: true, name: "purchases"})
    async getUserPurchases(@Ctx() ctx: TContext){
        try{
            const userResponse = await this.userService.getUserPurchases(parseInt(ctx.token));
            
            return userResponse[0].purchases;
        }catch(error){
            return error;
        }
    }

    @Mutation(returns => Auth, {name: 'SignIn'})
    async getUserByEmailAndPassword(@Arg('user_email', {nullable: false}) user_email: string, @Arg('user_password', {nullable: false}) user_password: string): Promise<Auth>{
        try{
            const userResponse = await this.userService.getUserByEmailAndPassword(user_email, md5(user_password + AuthPrivateKey));
            if(!userResponse)
                throw new ApolloError("Email and/or password is incorret", "200", {authenticated: false});
    
            const generatedToken = jwt.sign({userId: userResponse.id_user}, JwtPrivateKey, {expiresIn: 3600 * 24 * 30});
    
            return {
                token: generatedToken,
                //@ts-ignore
                user: {...userResponse}
            };
        }catch(error){
            return error;
        }
    }

    @Mutation(returns => NewUser, {name: 'SignUp'})
    async addUser(@Arg('data', {nullable: false}) newUserData: AddUserInput): Promise<NewUser> {
        try{
            const { name_user, email_user, password_user } = newUserData;

            let userResponse = await this.userService.getUserByEmail(email_user);
            if(userResponse)
                throw new ApolloError("This email is already being used", "200", {emailInUse: true});
            
            const now = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            
            userResponse = await this.userService.addUser({name_user, email_user, password_user: md5(password_user + AuthPrivateKey), createdAt: now, updatedAt: now});
            const libraryResponse = await this.libraryService.addLibrary({id_library: userResponse.id_user, createdAt: now, updatedAt: now, user: userResponse.id_user})

            return {
                //@ts-ignore
                user: {...userResponse},
                library: libraryResponse
            };
        }catch(error){
            return error;
        }
    }

    @UseMiddleware(isAuth)
    @Mutation(returns => UserSchema, {name: 'ChangeUserCoins', nullable: true})
    async changeUserCoins(@Arg('data', {nullable: false}) newUserCoins: UpadteUserCoinsInput, @Ctx() ctx: TContext){
        try{
            const { quantity_coins } = newUserCoins;

            const userCoinsResponse = await this.userService.getUserCoinsById(parseInt(ctx.token));
            if(!userCoinsResponse)
                throw new ApolloError("Invalid action", "403")

            await this.userService.updateUserCoins(parseInt(ctx.token), (userCoinsResponse.quantity_coins + quantity_coins))
        }catch(error){
            return error;
        }
    }
}

export default UserResolver;