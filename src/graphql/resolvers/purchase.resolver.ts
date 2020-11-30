import { ApolloError } from "apollo-server";
import { inject, injectable } from "inversify";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import * as momentTz from 'moment-timezone';

import { AddPurchaseInput, PurchaseSchema } from "../schemas/purchase.schema";

import PurchaseService from "../../services/purchase.service";
import UserService from "../../services/user.service";
import TrackService from "../../services/track.service";
import LibraryService from "../../services/library.service";

import { isAuth } from "../../middlewares/isAuth";

import { TContext } from "../../utils/interfaces/context.interface";

@injectable()
@Resolver()
class PurchaseResolver {
    constructor(@inject("PurchaseService") private purchaseService: PurchaseService, @inject("UserService") private userService: UserService,
    @inject("TrackService") private trackService: TrackService, @inject("LibraryService") private libraryService: LibraryService) {}

    @Query(returns => PurchaseSchema)

    @UseMiddleware(isAuth)
    @Mutation(returns => PurchaseSchema, {name: 'AddPurchase'})
    async addPurchase(@Arg("data", {nullable: false}) newPurchaseData: AddPurchaseInput, @Ctx() ctx: TContext){
        try{
            const userId = parseInt(ctx.token);

            const userCoins = await this.userService.getUserCoinsById(userId);
            if(!userCoins)
                throw new ApolloError("Invalid action.", "403")

            const trackResponse = await this.trackService.getTrackDataById(newPurchaseData.trackId);
            if(!trackResponse)
                throw new ApolloError("The track with the given id wasn't found.", "400");

            const userPurchase = await this.purchaseService.getPurchaseByUserAndTrack(userId, newPurchaseData.trackId);
            if(userPurchase)
                throw new ApolloError("The user already bought the track", "200", {trackAlreadyBought: true});

            if(userCoins.quantity_coins < trackResponse.price)
                throw new ApolloError("User doesn't have enough coins to purchase the track.", "200", {enoughCoins: false});

            const now = momentTz(new Date()).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const purchaseResponse = await this.purchaseService.addPurchase({
                value_purchase: trackResponse.price,
                createdAt: now,
                updatedAt: now,
                trackId: newPurchaseData.trackId,
                userId: userId
            })

            await this.userService.updateUserCoins(userId, (userCoins.quantity_coins - trackResponse.price));
            
            let id_library_album: number;

            let libraryAlbum = await this.libraryService.getLibraryAlbumByRelation(userId, trackResponse.albumId);
            if(!libraryAlbum){
                libraryAlbum = await this.libraryService.addLibraryAlbumRelation(userId, trackResponse.albumId);
                id_library_album = libraryAlbum.insertId;
            }else
                id_library_album = libraryAlbum.id_library_album;

            await this.libraryService.addLibraryTrackRelation(id_library_album, newPurchaseData.trackId);

            return purchaseResponse;
        }catch(error){
            return error;
        }
    }
}

export default PurchaseResolver;