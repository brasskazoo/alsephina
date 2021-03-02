import StarSystem, { SystemEnvironment } from './System';

test('can create a star system with default name', () => {
    const system = new StarSystem();
    expect(system).toHaveProperty('name');
});

test('star system has an environment suitability', () => {
    const system = new StarSystem();
    expect(system).toHaveProperty('environment');
    expect(system.environment).not.toBeNull();
});

test('star system can set an environment suitability', () => {
    const system = new StarSystem(SystemEnvironment.SUITABLE);
    expect(system).toHaveProperty('environment');
    expect(system.environment).toEqual(SystemEnvironment.SUITABLE);
});
