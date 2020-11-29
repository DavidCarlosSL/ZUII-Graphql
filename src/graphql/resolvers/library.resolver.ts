import { ApolloError } from "apollo-server";
import { inject, injectable } from "inversify";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import { LibrarySchema } from "../schemas/library.schema";

import LibraryService from "../../services/library.service";

import { TContext } from "../../utils/interfaces/context.interface";

import { isAuth } from "../../middlewares/isAuth";
import { LibraryAlbumSchema } from "../schemas/libraryAlbum.schema";

@injectable()
@Resolver(of => LibrarySchema)
class LibraryResolver {
    constructor(@inject("LibraryService") private libraryService: LibraryService) {}

    @UseMiddleware(isAuth)
    @Query(returns => [LibrarySchema], {name: 'library', nullable: true})
    async getLibraryAlbums(@Ctx() ctx: TContext): Promise<LibrarySchema[]>{
        try{
            const response = this.libraryService.getAlbumsByLibrary(parseInt(ctx.token));

            return response;
        }catch(error){
            return error
        }
    }

    @UseMiddleware(isAuth)
    @Query(returns => LibraryAlbumSchema, {name: "libraryAlbum", nullable: false})
    async getLibraryAlbumTracks(@Arg("libraryAlbumId", {nullable: false}) libraryAlbumId: number, @Ctx() ctx: TContext){
        try{
            const response = await this.libraryService.getAlbumTracksByLibrary(libraryAlbumId, parseInt(ctx.token));
            
            return response;
        }catch(error){
            return error;
        }
    }
}

export default LibraryResolver;