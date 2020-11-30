import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { IUser, User } from "../models/user.model";

@injectable()
class UserService {
    private connection: Connection;
    private userRepository: Repository<User>

    constructor() {
        this.connection = getConnection('default');
        this.userRepository = this.connection.getRepository(User);
    }

    public async getUserByEmailAndPassword(userEmail: string, userPassword: string): Promise<User>{
        const user = await this.userRepository.createQueryBuilder()
        .where("email_user = :userEmail AND password_user = :userPassword", {userEmail: userEmail, userPassword: userPassword})
        .getOne();
        return user;
    }

    public async getUserByEmail(userEmail: string): Promise<User>{
        const user = await this.userRepository.createQueryBuilder()
        .select(["id_user"])
        .where("email_user = :userEmail", {userEmail: userEmail})
        .getRawOne();
        return user;
    }

    public async getUserById(userId: number): Promise<User>{
        const user = await this.userRepository.createQueryBuilder()
        .where("id_user = :userId", {userId: userId})
        .getOne();
        return user;
    }

    public async addUser(data: IUser): Promise<User>{
        const insertUser = await this.userRepository.createQueryBuilder().insert().into(User)
        .values([{
            name_user: data.name_user,
            email_user: data.email_user,
            password_user: data.password_user,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }])
        .execute();

        const response = await this.getUserById(insertUser.raw.insertId);
        return response;
    }

    public async getUserCoinsById(userId: number){
        const user = await this.userRepository.createQueryBuilder()
        .select(["quantity_coins"])
        .where("id_user = :userId", {userId: userId})
        .getRawOne();

        return user;
    }

    public async updateUserCoins(userId: number, quantity: number){
        await this.userRepository.createQueryBuilder().update(User)
        .set({quantity_coins: quantity})
        .where("id_user = :userId", {userId: userId})
        .execute();
    }

    public async getUserPurchases(userId: number){
        const user = await this.userRepository.createQueryBuilder("user")
        .where("id_user = :userId", {userId: userId})
        .innerJoinAndSelect("user.purchases", "purchase")
        .getMany();
        return user;
    }
}

export default UserService;