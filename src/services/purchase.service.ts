import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { IPurchase, Purchase } from "../models/purchase.model";

@injectable()
class PurchaseService {
    private connection: Connection;
    private purchaseRepository: Repository<Purchase>

    constructor(){
        this.connection = getConnection('default');
        this.purchaseRepository = this.connection.getRepository(Purchase);
    }

    public async getPurchaseById(purchaseId: number){
        const purchase = await this.purchaseRepository.createQueryBuilder()
        .where("id_purchase = :purchaseId", {purchaseId: purchaseId})
        .getOne();
        return purchase;
    }

    public async getPurchaseByUserAndTrack(userId: number, trackId: number){
        const purchase = await this.purchaseRepository.createQueryBuilder()
        .select(["id_purchase"])
        .where("userId = :userId AND trackId = :trackId", {userId: userId, trackId: trackId})
        .getRawOne();
        return purchase;
    }

    public async addPurchase(data: IPurchase){
        const newPurchase = await this.purchaseRepository.createQueryBuilder().insert().into(Purchase)
        .values([{
            value_purchase: data.value_purchase,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            trackId: data.trackId,
            userId: data.userId
        }])
        .execute();
        
        const purchase = await this.getPurchaseById(newPurchase.raw.insertId)
        return purchase;
    }
}

export default PurchaseService;