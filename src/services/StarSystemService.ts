import postal from 'postal';
import StarSystem, { SystemEnvironment } from '../System/StarSystem';
import { Service } from './ServiceFactory';

const systems: StarSystem[] = [];

export default class StarSystemService implements Service {
    name = 'StarSystemService';
    private static _instance: StarSystemService;

    private constructor() {
        postal.subscribe({
            channel: 'StarSystem',
            topic: 'init.home.systems',
            callback: function (data) {
                const { reqId, player } = data;
                const playerId = player.id;

                if (playerId && systems.length === 0) {
                    // At least one system is suitable for home system
                    systems.push(new StarSystem(SystemEnvironment.SUITABLE));
                    systems.push(new StarSystem());
                    systems.push(new StarSystem());
                    systems.push(new StarSystem());

                    const newPlayer = { ...data.player, visibleSystems: systems };

                    const channel = postal.channel('player');
                    channel.publish('initial.systems.created', { reqId, player: newPlayer });
                }
            },
        });
    }

    public static get Instance(): StarSystemService {
        return this._instance || (this._instance = new this());
    }
}
