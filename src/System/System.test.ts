import StarSystem from "./System"

test('can create a star system with default values', () => {
    let system = new StarSystem();
    expect(system).toHaveProperty('name')
    expect(system).toHaveProperty('explored', false)
})

test('can explore a system', () => {
    let system = new StarSystem();

    system.explore();
    expect(system.explored).toBe(true)
})