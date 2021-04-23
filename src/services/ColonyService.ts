import { Service } from './ServiceFactory';
import postal from 'postal';
import Colony, { ColonyType } from '../StarSystemColony/Colony';
import { StarSystemType } from '../System/StarSystem';

const coloniesByPlayer: Record<string, ColonyType[]> = {};

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
                const homeSystemId = data.player.homeSystemId;

                if (playerId && data.player.visibleSystems) {
                    const homeSystem = data.player.visibleSystems.find(
                        (sys: StarSystemType) => sys.id === homeSystemId,
                    );

                    // Create Home colony
                    const colony = new Colony(homeSystemId, playerId, 100000);

                    // Would be better manipulating as objects
                    // homeSystem = {...homeSystem, colonyId: colony.id};
                    homeSystem.colonyId = colony;

                    coloniesByPlayer[playerId] = [colony];

                    const playerUpdate = {
                        ...data.player,
                        colonies: coloniesByPlayer[playerId],
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
