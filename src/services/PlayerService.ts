import postal from 'postal';
import Player from '../Player/Player';
import { Service } from './ServiceFactory';

export default class PlayerService implements Service {
    name = 'PlayerService';
    private static _instance: PlayerService;

    private constructor() {
        const channel = postal.channel('player');

        channel.subscribe('create.new', function (_data, envelope) {
            console.log(envelope);
            const player = new Player();

            postal.publish({
                channel: 'player',
                topic: 'player.created',
                data: {
                    player: player,
                },
            });
        });
    }

    public static get Instance(): PlayerService {
        return this._instance || (this._instance = new this());
    }
}
