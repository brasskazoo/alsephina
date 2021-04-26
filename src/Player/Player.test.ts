import ServiceFactory from '../services/ServiceFactory';
import { default as StarSystem, SystemEnvironment } from '../System/StarSystem';
import Player, { PlayerType } from './Player';
import { generateId } from '../util/EntityId';
import postal from 'postal';

beforeAll(() => {
    ServiceFactory();
});

describe('New player object', () => {
    let player: PlayerType;

    beforeAll(() => {
        player = new Player();
    });

    test('player is correct type', () => {
        expect(player).toBeInstanceOf(Player)
    });

    test('New Player has an id', () => {
        expect(player.id).not.toBeNull();
    });
});

/**
 * Creating a new player triggers a sequence of events. These tests should check the outcome.
 */
describe('New player event outcome', () => {
    const reqId = generateId();
    let player: PlayerType;

    test('Player is created by an event', (done) => {
        // Setup subscriptions first
        postal.subscribe({
            channel: 'player', topic: 'player.updated', callback: ((data, _env) => {
                expect(data.reqId).toEqual(reqId);
                expect(data.player).toBeDefined();

                player = data.player;

                done();
            })
        });

        // Trigger player.create event
        postal.publish({channel: 'player', topic: 'create.new', data: { reqId }});
    });

    test('Player start with a colonised home system', () => {
        expect(player.homeSystemId).not.toBeNull();
        expect(player.colonies).toHaveLength(1);

        const homeColony = player.colonies[0];
        expect(homeColony.systemId).toEqual(player.homeSystemId);

        const homeSystem = player.exploredSystems.find(s => (s.id === player.homeSystemId));
        // TODO see StarSystemService expect(homeSystem?.colonyId).toEqual(homeColony.id)
        expect(homeSystem).toBeDefined();
    });

    test('Player has unexplored systems', () => {
        expect(player).toHaveProperty('visibleSystems');
        expect(player.visibleSystems).toHaveLength(3);
    });
});

describe.skip('Player exploration', () => {
    const reqId = generateId();
    let player: PlayerType;

    beforeAll((done) => {        // Setup subscriptions first
        postal.subscribe({
            channel: 'player', topic: 'player.updated', callback: ((data, _env) => {
                console.log(`------ RX`);

                expect(data.reqId).toEqual(reqId);
                expect(data.player).toBeDefined();

                player = data.player;

                done();
            })
        });

        // Trigger player.create event
        postal.publish({channel: 'player', topic: 'create.new', data: { reqId }});
    });

    test('Player can explore a system', (done) => {
        const visibleSystemsCount = player.visibleSystems.length;

        // Receive player update event
        postal.subscribe({
            channel: 'player', topic: 'player.updated', callback: ((data, _env) => {
                const { playerUpd } = data;
                expect(playerUpd.exploredSystems).toHaveLength(1);
                expect(playerUpd.visibleSystems).not.toContain(player.exploredSystems[0]);
                expect(playerUpd.visibleSystems.length).toBeLessThan(visibleSystemsCount + 4);

                done();
            })
        });

        // Trigger StarSystem.explore event
        postal.publish({channel: 'StarSystem', topic: 'explore', data: { reqId }});
    });

    test.skip('Player cannot explore an unknown system', () => {
        const sys = new StarSystem();

        const block = () => {
            // player.explore(sys.id);
        };
        expect(block).toThrowError(`Cannot explore system ${sys.id}: Could not find matching visible system`);
    });
});

describe.skip('Player colonisation', () => {
    test('Player can colonise suitable environments', () => {
        const player = new Player();

        expect(player.canColonise(SystemEnvironment.SUITABLE)).toBe(true);
        expect(player.canColonise(SystemEnvironment.NOT_HABITABLE)).toBe(false);
        expect(player.canColonise(SystemEnvironment.HOSTILE)).toBe(false);
    });

    // test('Player can colonise a system', () => {
    //     const player = new Player();
    //
    //     const sys = new StarSystem(SystemEnvironment.SUITABLE);
    //     player.exploredSystems.push(sys);
    //
    //     player.colonise(sys.id);
    //     expect(player.colonisedSystems).toHaveLength(2);
    // });

    // test('Player cannot colonise an unsuitable system', () => {
    //     const player = new Player();
    //     const sys = new StarSystem(SystemEnvironment.HOSTILE);
    //
    //     const block = () => {
    //         player.exploredSystems.push(sys);
    //         player.colonise(sys.id);
    //     };
    //     expect(block).toThrowError(`Cannot colonise system ${sys.id}: Not a suitable environment`);
    // });

    /**
     * Player can only colonise systems that exist in their explored list
     */
    // test('Player cannot colonise an unknown system', () => {
    //     const player = new Player();
    //     const sys = new StarSystem(SystemEnvironment.HOSTILE);
    //
    //     const block = () => {
    //         player.colonise(sys.id);
    //     };
    //     expect(block).toThrowError(`Cannot colonise system ${sys.id}: Could not find matching explored system`);
    // });

    // test('Player cannot colonise an unexplored system', () => {
    //     const player = new Player();
    //     const sys = player.visibleSystems[0];
    //
    //     const block = () => {
    //         player.colonise(sys.id);
    //     };
    //     expect(block).toThrowError(`Cannot colonise system ${sys.id}: Could not find matching explored system`);
    // });

    // test('Player cannot colonise a previously colonised system', () => {
    //     const player = new Player();
    //     const sys = player.colonisedSystems[0];
    //
    //     const block = () => {
    //         player.colonise(sys.id);
    //     };
    //     expect(block).toThrowError(`Cannot colonise system ${sys.id}: Could not find matching explored system`);
    // });
});
