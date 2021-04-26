import postal from 'postal';
import Player, { PlayerType } from '../Player/Player';
import { Service } from './ServiceFactory';
import { ColonyType } from '../StarSystemColony/Colony';

const players: Record<string, PlayerType> = {};

type EventDataType = {
    reqId: string,
    playerId? :string,
    player?: PlayerType,
    colony: ColonyType,

}

export default class PlayerService implements Service {
    name = 'PlayerService';
    private static _instance: PlayerService;

    private constructor() {
        const channel = postal.channel('player');

        channel.subscribe('create.new', function (data: unknown, envelope) {
            console.log(envelope);
            console.log(data);
            const { reqId } = data as EventDataType;
            const player = new Player();
            players[player.id] = player;

            const chStarSystem = postal.channel('StarSystem');

            // Once the home systems are created, create a colony on the first system.
            postal.subscribe({
                    channel: 'player', topic: 'initial.systems.created', callback: (data, envelope) => {
                        console.log(envelope);

                        const {reqId, player} = data;

                        // Get the target home system TODO check for habitable
                        const homeSystemId = player.visibleSystems[0].id;
                        const updPlayer = {...player, homeSystemId};
                        players[player.id] = updPlayer;

                        postal.publish({
                            channel: 'Colony', topic: 'create.colony', data: {
                                reqId,
                                player: updPlayer,
                                systemId: updPlayer.homeSystemId
                            }
                        });
                        // TODO unsubscribe?
                    }
                }
            );

            // Request initial star systems
            chStarSystem.publish('init.home.systems', {reqId, player});
        });

        // This will catch the home system colony as well as subsequent colonies
        channel.subscribe('colony.created', function (data: unknown, env) {
            console.log(env);
            console.log(data);

            const {reqId, playerId = '', colony} = data as EventDataType;

            let player = players[playerId];
            // TODO check it doesn't already exist
            const colonies = [...player.colonies, colony];

            player = {...player, colonies};

            players[playerId] = player;

            postal.publish({channel: 'player', topic: 'player.updated', data:{reqId, player}})
        })
    }

    public static get Instance(): PlayerService {
        return this._instance || (this._instance = new this());
    }
}
