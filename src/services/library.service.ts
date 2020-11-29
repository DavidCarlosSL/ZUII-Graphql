import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { ILibrary, Library } from "../models/library.model";
import { LibraryAlbum } from "../models/library_album.model";

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

    public async getAlbumsByLibrary(libraryId: number){
        const library = await this.libraryRepository.createQueryBuilder("library")
        .where("id_library = :libraryId", {libraryId: libraryId})
        .leftJoinAndSelect("library.libraryAlbums", "libraryAlbums")
        .leftJoinAndSelect("libraryAlbums.albumId", "album")
        .getMany();
        return library;
    }

    public async getAlbumTracksByLibrary(libraryAlbumId: number, libraryId: number){
        const albumTracks = await this.connection.getRepository(LibraryAlbum).createQueryBuilder("library_album")
        .where("id_library_album = :libraryAlbumId AND libraryId = :libraryId", {libraryAlbumId: libraryAlbumId, libraryId: libraryId})
        .innerJoinAndSelect("library_album.libraryTracks", "libraryTracks")
        .innerJoinAndSelect("libraryTracks.trackId", "track")
        .getOne();
        return albumTracks;
    }
}

export default LibraryService;