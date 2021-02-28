import StarSystem from "../System/System";

export default class Player {
    homeSystem: StarSystem
    knownSystems: StarSystem[]

    constructor() {
        this.homeSystem = new StarSystem()
        console.debug(`New Player at ${this.homeSystem.name}`)

        this.knownSystems = [new StarSystem(), new StarSystem(), new StarSystem()]
    }
}