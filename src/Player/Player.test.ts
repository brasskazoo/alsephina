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
