import StarSystem, { SystemEnvironment } from '../System/StarSystem';
import Player from '../Player/Player';

// Integration tests
test('New Player colony has default population', () => {
    const player = new Player();
    const colony = player.colonisedSystems[0].colony;
    expect(colony).not.toBeNull();
    expect(colony?.population).toBe(100);
});

test('Player can colonise a system', () => {
    const player = new Player();

    const sys = new StarSystem(SystemEnvironment.SUITABLE);
    player.exploredSystems.push(sys);

    player.colonise(sys.id);
    expect(player.colonisedSystems).toHaveLength(2);
    expect(sys.colony?.playerId).toBe(player.id);
    expect(sys.colony?.systemId).toBe(sys.id);
    expect(sys.colony?.population).toBe(0.1);
});

// [future] test colony's population grows
