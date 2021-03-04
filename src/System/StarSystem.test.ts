import StarSystem, { SystemEnvironment } from './StarSystem';

test('star system has a default name', () => {
    const system = new StarSystem();
    expect(system).toHaveProperty('name');
    expect(system.name).not.toBeNull();
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
