import { ApolloError } from "apollo-server";
import { inject, injectable } from "inversify";
import { Arg, Query, Resolver } from "type-graphql";

import { AlbumSchema } from "../schemas/album.schema";

import AlbumService from "../../services/album.service";

@injectable()
@Resolver(of => AlbumSchema)
class AlbumResolver {
    constructor(@inject("AlbumService") private albumService: AlbumService) {}

    @Query(returns => AlbumSchema, {name: 'albumById', nullable: true})
    async getAlbumById(@Arg("albumId", {nullable: false}) albumId: number): Promise<AlbumSchema>{
        try{
            const albumResponse = await this.albumService.getAlbumById(albumId);
            if(!albumResponse)
                throw new ApolloError("The album with the given Id was not found", "200", {foundAlbum: false})

            return albumResponse;
        }catch(error){
            return error;
        }
    }
}

export default AlbumResolver;