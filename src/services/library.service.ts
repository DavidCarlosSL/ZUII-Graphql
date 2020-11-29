import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { ILibrary, Library } from "../models/library.model";

@injectable()
class LibraryService {
    private connection: Connection;
    private libraryRepository: Repository<Library>

    constructor(){
        this.connection = getConnection('default');
        this.libraryRepository = this.connection.getRepository(Library);
    }

    public async getLibraryById(libraryId: number): Promise<Library>{
        const library = this.libraryRepository.createQueryBuilder()
        .where("id_library = :libraryId", {libraryId: libraryId})
        .getOne();
        return library;
    }

    public async addLibrary(data: ILibrary): Promise<Library>{
        await this.libraryRepository.createQueryBuilder().insert().into(Library)
        .values([{
            id_library: data.user,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            user: data.user
        }])
        .execute();

        const library = await this.getLibraryById(data.user);
        return library;
    }
}

export default LibraryService;