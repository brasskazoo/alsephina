import Player from './Player';

test('Player has home system', () => {
    let player = new Player();

    expect(player).toHaveProperty('homeSystem');
});

test('Player has unexplored systems', () => {
    let player = new Player();

    expect(player).toHaveProperty('knownSystems');
    expect(player.knownSystems).toHaveLength(3);
});
