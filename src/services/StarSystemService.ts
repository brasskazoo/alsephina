import postal from 'postal';
import StarSystem, { SystemEnvironment } from '../System/StarSystem';
import { Service } from './ServiceFactory';

const systems: StarSystem[] = [];

export default class StarSystemService implements Service {
    name = 'StarSystemService';
    private static _instance: StarSystemService;

    private constructor() {
        postal.subscribe({
            channel: 'player',
            topic: 'player.created',
            callback: function (data) {
                const playerId = data.player.id;

                if (playerId && systems.length === 0) {
                    // Create starting system
                    const newSystem = new StarSystem(SystemEnvironment.SUITABLE);
                    systems.push(newSystem);

                    const newPlayer = { ...data.player, visibleSystems: systems };

                    const channel = postal.channel('player');
                    channel.publish('player.homeSystem.created', { player: newPlayer });
                    // channel.publish('player.updated', { player: newPlayer });
                }
            },
        });
    }

    public static get Instance(): StarSystemService {
        return this._instance || (this._instance = new this());
    }
}