import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IPurchase } from "../../models/purchase.model";

@ObjectType()
export class PurchaseSchema implements IPurchase {
    @Field(type => ID)
    id_purchase: number;
    
    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;
    
    @Field()
    value_purchase: number;

    @Field()
    trackId: number;

    @Field()
    userId: number;
}

@InputType()
export class AddPurchaseInput implements Partial<PurchaseSchema>{
    @Field(type => Number, {nullable: false})
    trackId: number;
}