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
            channel: 'Colony',
            topic: 'create.colony',
            callback: function (data, env) {
                console.log(env);
                console.log(`ColonyService: [IN] ${JSON.stringify(data)}`);

                const { reqId, player, systemId } = data;

                const playerId = player.id;

                if (playerId && data.player.visibleSystems) {
                    const targetSystem = data.player.visibleSystems.find(
                        (sys: StarSystemType) => sys.id === systemId,
                    );

                    // Create Home colony TODO initial population for home system vs normal
                    const colony = new Colony(systemId, playerId, 100000);

                    // Would be better manipulating as objects
                    // homeSystem = {...homeSystem, colonyId: colony.id};
                    targetSystem.colonyId = colony;

                    if (coloniesByPlayer[playerId]) {
                        coloniesByPlayer[playerId].push(colony)
                    } else {
                        coloniesByPlayer[playerId] = [colony];
                    }

                    data = { reqId, playerId, colony };
                    console.log(`ColonyService: [OUT] ${JSON.stringify(data)}`);

                    postal.channel('player').publish('colony.created', data);
                }
            },
        });
    }

    public static get Instance(): ColonyService {
        return this._instance || (this._instance = new this());
    }
}
