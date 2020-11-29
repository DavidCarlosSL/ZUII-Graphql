import { ApolloError } from "apollo-server";
import { inject, injectable } from "inversify";
import { Arg, Args, Query, Resolver } from "type-graphql";

import { ArtistSchema } from "../schemas/artist.schema";

import ArtistService from '../../services/artist.service';

import { GetArtistArgs, GetArtistByGenreArgs } from "../validators/artist.validators";

@injectable()
@Resolver(of => ArtistSchema)
class ArtistResolver {
    constructor(@inject("ArtistService") private artistService: ArtistService) {}

    @Query(returns => [ArtistSchema], {name: 'artists', nullable: true})
    async getAllArtists(@Args() {limit, offset}: GetArtistArgs): Promise<ArtistSchema[]>{
        try{
            const artistResponse = await this.artistService.getAllArtists(limit, offset);

            return artistResponse;
        }catch(error){
            return error;
        }
    }

    @Query(returns => [ArtistSchema], {name: 'genreArtists', nullable: true})
    async getArtistsByGenre(@Args() {limit, offset, genreId}: GetArtistByGenreArgs): Promise<ArtistSchema[]>{
        try{
            const artistResponse = await this.artistService.getArtistsByGenre(genreId, limit, offset)

            return artistResponse;
        }catch(error){
            return error;
        }
    }

    @Query(returns => ArtistSchema, {name: 'artistById', nullable: true})
    async getArtistsById(@Arg("artistId", {nullable: false}) artistId: number): Promise<ArtistSchema>{
        try{
            const artistResponse = await this.artistService.getArtistById(artistId);
            if(!artistResponse)
                throw new ApolloError("The artist of the given id was not found", "200", {artistFound: false})

            return artistResponse;
        }catch(error){
            return error;
        }
    }
}

export default ArtistResolver;