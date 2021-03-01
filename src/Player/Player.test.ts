import Player from './Player';

test('Player has home system', () => {
    const player = new Player();

    expect(player).toHaveProperty('homeSystem');
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
