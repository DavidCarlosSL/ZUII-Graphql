import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { User } from "../models/user.model";

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
}

export default UserService;