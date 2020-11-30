import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { Album } from "../models/album.model";

@injectable()
class AlbumService {
    private connection: Connection;
    private albumRepository: Repository<Album>

    constructor(){
        this.connection = getConnection("default")
        this.albumRepository = this.connection.getRepository(Album);
    }

    public async getAlbumById(albumId: number): Promise<Album>{
        const album = await this.albumRepository.createQueryBuilder("album")
        .leftJoinAndSelect("album.tracks", "track")
        .leftJoinAndSelect("album.genres", "genre")
        .where("album.id_album = :albumId", {albumId: albumId})
        .getOne();
        return album;
    }
}

export default AlbumService;