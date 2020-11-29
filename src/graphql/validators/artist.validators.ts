import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class GetArtistArgs {
    @Field(type => Int, {nullable: true, defaultValue: 20})
    limit?: number;

    @Field(type => Int, {nullable: true, defaultValue: 0})
    offset?: number;
}

@ArgsType()
export class GetArtistByGenreArgs {
    @Field(type => Int, {nullable: false})
    genreId: number;

    @Field(type => Int, {nullable: true, defaultValue: 20})
    limit?: number;

    @Field(type => Int, {nullable: true, defaultValue: 0})
    offset?: number;
}