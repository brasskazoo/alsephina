import { Service } from './ServiceFactory';
import postal from 'postal';
import Colony from '../StarSystemColony/Colony';

const coloniesByPlayer: Record<string, Record<string, Colony>> = {};

export default class ColonyService implements Service {
    name = 'ColonyService';
    private static _instance: ColonyService;

    private constructor() {
        postal.subscribe({
            channel: 'player',
            topic: 'player.homeSystem.created',
            callback: function (data, env) {
                console.log(env);
                console.log(`ColonyService: [IN] ${JSON.stringify(data)}`);
                const playerId = data.player.id;

                if (playerId && data.player.visibleSystems) {
                    const homeSystem = data.player.visibleSystems[0];
                    const homeSystemId = data.player.visibleSystems[0].id;

                    // Create Home colony
                    const colony = new Colony(homeSystemId, playerId, 100000);
                    homeSystem.colony = colony;
                    // Would be better manipulating as objects
                    // const homeColonySystem = { ...homeSystem, colony: colony };

                    coloniesByPlayer[playerId] = { homeSystemId: colony };

                    const playerUpdate = {
                        ...data.player,
                        homeSystemId: homeSystemId,
                        colonisedSystems: [homeSystem],
                        visibleSystems: [],
                    };
                    const channel = postal.channel('player');

                    data = { player: playerUpdate };
                    console.log(`ColonyService: [OUT] ${JSON.stringify(data)}`);

                    channel.publish('player.homeColony.created', data);
                    channel.publish('player.updated', { player: playerUpdate });
                }
            },
        });
    }

    public static get Instance(): ColonyService {
        return this._instance || (this._instance = new this());
    }
}
