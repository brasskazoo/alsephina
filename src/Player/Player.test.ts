import StarSystem, { SystemEnvironment } from '../System/System';
import Player from './Player';

test('Player start with a colonised home system', () => {
    const player = new Player();

    expect(player.homeSystemName).not.toBeNull();
    expect(player.colonisedSystems).toHaveLength(1);
    expect(player.colonisedSystems[0].name).toEqual(player.homeSystemName);
});

test('Player has unexplored systems', () => {
    const player = new Player();

    expect(player).toHaveProperty('visibleSystems');
    expect(player.visibleSystems).toHaveLength(3);
});

test('Player can explore a system', () => {
    const player = new Player();

    const visibleSystemsCount = player.visibleSystems.length;

    player.explore(player.visibleSystems[0].name);

    expect(player.exploredSystems).toHaveLength(1);
    expect(player.visibleSystems).not.toContain(player.exploredSystems[0]);
    expect(player.visibleSystems.length).toBeLessThan(visibleSystemsCount + 4);
});

test('Player can colonise a system', () => {
    const player = new Player();

    const sys = new StarSystem(SystemEnvironment.SUITABLE);
    player.exploredSystems.push(sys);

    player.colonise(sys.name);
    expect(player.colonisedSystems).toHaveLength(2);
});

test('Player cannot colonise an unsuitable system', () => {
    const player = new Player();
    const sys = new StarSystem(SystemEnvironment.HOSTILE);

    const block = () => {
        player.exploredSystems.push(sys);
        player.colonise(sys.name);
    };
    expect(block).toThrowError(`Cannot colonise system ${sys.name}: Not a suitable environment`);
});

/**
 * Player can only colonise systems that exist in their explored list
 */
test('Player cannot colonise an unknown system', () => {
    const player = new Player();
    const sys = new StarSystem(SystemEnvironment.HOSTILE);

    const block = () => {
        player.colonise(sys.name);
    };
    expect(block).toThrowError(`Cannot colonise system ${sys.name}: Could not find matching explored system`);
});

test('Player cannot colonise an unexplored system', () => {
    const player = new Player();
    const sys = player.visibleSystems[0];

    const block = () => {
        player.colonise(sys.name);
    };
    expect(block).toThrowError(`Cannot colonise system ${sys.name}: Could not find matching explored system`);
});

test('Player cannot colonise a previously colonised system', () => {
    const player = new Player();
    const sys = player.colonisedSystems[0];

    const block = () => {
        player.colonise(sys.name);
    };
    expect(block).toThrowError(`Cannot colonise system ${sys.name}: Could not find matching explored system`);
});