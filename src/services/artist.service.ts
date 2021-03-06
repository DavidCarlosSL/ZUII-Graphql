import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { Artist } from "../models/artist.model";
import { Genre } from "../models/genre.model";

@injectable()
class ArtistService {
    private connection: Connection;
    private artistRepository: Repository<Artist>

    constructor(){
        this.connection = getConnection('default');
        this.artistRepository = this.connection.getRepository(Artist);
    }

    public async getAllArtists(limit: number, offset?: number): Promise<Artist[]>{
        const artists = await this.artistRepository.createQueryBuilder("artist")
        .leftJoinAndSelect("artist.genres", "genre")
        .limit(limit)
        .offset(offset)
        .getMany();
        return artists;
    }

    public async getArtistsByGenre(genreId: number, limit: number, offset?: number): Promise<Artist[]>{
        const artists = await this.artistRepository.createQueryBuilder("artist")
        .innerJoinAndSelect("artist.genres", "genre", "genre.id_genre = :genreId", {genreId: genreId})
        .limit(limit)   
        .offset(offset)
        .getMany();
        return artists;
    }

    public async getArtistById(artistId: number): Promise<Artist>{
        const artist = await this.artistRepository.createQueryBuilder("artist")
        .where("id_artist = :artistId", {artistId: artistId})
        .leftJoinAndSelect("artist.albums", "album")
        .leftJoinAndSelect("album.genres", "genre")
        .getOne();
        return artist;
    }
}

export default ArtistService;