import { ApolloError } from 'apollo-server';
import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';
import * as momentTz from 'moment-timezone';

import UserSchema, {AddUserInput} from '../schemas/user.schema';
import Auth from '../schemas/auth.schema';

import UserService from '../../services/user.service';
import LibraryService from '../../services/library.service';

import {AuthPrivateKey, JwtPrivateKey} from '../../config/custom-environment-variables.json';
import { NewUser } from '../schemas/newUser.schema';

@injectable()
@Resolver(of => UserSchema)
class UserResolver {
    constructor(@inject("UserService") private userService: UserService, @inject("LibraryService") private libraryService: LibraryService) {}

    @Query(returns => UserSchema)

    @Mutation(returns => Auth, {name: 'SignIn'})
    async getUserByEmailAndPassword(@Arg('user_email', {nullable: false}) user_email: string, @Arg('user_password', {nullable: false}) user_password: string): Promise<Auth>{
        try{
            const userResponse = await this.userService.getUserByEmailAndPassword(user_email, md5(user_password + AuthPrivateKey));
            if(!userResponse)
                throw new ApolloError("Email and/or password is incorret", "200", {authenticated: false});
    
            const generatedToken = jwt.sign({userId: userResponse.id_user}, JwtPrivateKey, {expiresIn: 3600 * 24 * 30});
    
            return {
                token: generatedToken,
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
                user: {...userResponse},
                library: libraryResponse
            };
        }catch(error){
            return error;
        }
    }
}

export default UserResolver;