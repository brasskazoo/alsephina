import StarSystem from '../System/System';

export default class Player {
    homeSystem: StarSystem;
    visibleSystems: StarSystem[];
    exploredSystems: StarSystem[];

    constructor() {
        this.homeSystem = new StarSystem();
        console.debug(`New Player at ${this.homeSystem.name}`);

        this.visibleSystems = [new StarSystem(), new StarSystem(), new StarSystem()];
        this.exploredSystems = [];
    }

    explore(systemId: string): void {
        const targetSystem = this.visibleSystems.find((item) => systemId === item.name);

        if (targetSystem) {
            this.exploredSystems.push(targetSystem);
            console.debug(`Explored: ${targetSystem.name}`);

            // TODO Generate new detected systems

            this.visibleSystems = this.visibleSystems.filter((sys) => sys !== targetSystem);
        }
    }
}
