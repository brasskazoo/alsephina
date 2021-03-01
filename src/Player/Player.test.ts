import Player from './Player';

test('Player has home system', () => {
    const player = new Player();

    expect(player).toHaveProperty('homeSystem');
});

test('Player has unexplored systems', () => {
    const player = new Player();

    expect(player).toHaveProperty('knownSystems');
    expect(player.knownSystems).toHaveLength(3);
});
