import { injectable } from "inversify";
import { Connection, getConnection, Repository } from "typeorm";

import { Track } from "../models/track.model";

@injectable()
class TrackService {
    private connection: Connection;
    private trackRepository: Repository<Track>

    constructor() {
        this.connection = getConnection('default');
        this.trackRepository = this.connection.getRepository(Track);
    }

    public async getTrackDataById(trackId: number){
        const track = await this.trackRepository.createQueryBuilder()
        .select(["price, albumId"])
        .where("id_track = :trackId", {trackId: trackId})
        .getRawOne();
        return track;
    }
}

export default TrackService