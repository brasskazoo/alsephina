import StarSystem, { SystemEnvironment } from '../System/System';

export default class Player {
    homeSystemName: string;
    colonisedSystems: StarSystem[];
    visibleSystems: StarSystem[];
    exploredSystems: StarSystem[];

    constructor() {
        const homeSystem = new StarSystem(SystemEnvironment.SUITABLE);
        console.debug(`New Player at ${homeSystem.name}`);

        this.homeSystemName = homeSystem.name;
        this.colonisedSystems = [homeSystem];
        this.visibleSystems = [new StarSystem(), new StarSystem(), new StarSystem()];
        this.exploredSystems = [];
    }

    explore(systemId: string): void {
        const targetSystem = this.visibleSystems.find((item) => systemId === item.name);

        if (targetSystem) {
            this.exploredSystems.push(targetSystem);
            console.debug(`Explored: ${targetSystem.name}`);

            const newSystemCount = Math.floor(Math.random() * 5);
            console.debug(`Discovered ${newSystemCount} new star systems`);

            for (let i = 0; i < newSystemCount; i++) {
                const s = new StarSystem();
                console.debug(`Discovered: ${s.name}`);
                // TODO Check for duplicate IDs
                this.visibleSystems.push(s);
            }

            this.visibleSystems = this.visibleSystems.filter((sys) => sys !== targetSystem);
        } else {
            throw `Cannot explore system ${systemId}: Could not find matching visible system`;
        }
    }

    canColonise = (sysEnv: SystemEnvironment): boolean => {
        return sysEnv === SystemEnvironment.SUITABLE;
    };

    colonise(systemId: string): void {
        const targetSystem = this.exploredSystems.find((item) => systemId === item.name);

        if (targetSystem) {
            if (!this.canColonise(targetSystem.environment)) {
                throw `Cannot colonise system ${systemId}: Not a suitable environment`;
            }
            this.colonisedSystems.push(targetSystem);
            // TODO set a colonised flag on StarSystem?
            console.debug(`Colonised: ${targetSystem.name}`);

            this.exploredSystems = this.exploredSystems.filter((sys) => sys !== targetSystem);
        } else {
            throw `Cannot colonise system ${systemId}: Could not find matching explored system`;
        }
    }
}
