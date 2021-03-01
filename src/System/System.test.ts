import StarSystem from './System';

test('can create a star system with default name', () => {
    const system = new StarSystem();
    expect(system).toHaveProperty('name');
});
