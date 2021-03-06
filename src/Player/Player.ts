import Colony from '../StarSystemColony/Colony';
import StarSystem, { SystemEnvironment } from '../System/StarSystem';
import { generateId } from '../util/EntityId';

export default class Player {
    id: string;
    homeSystemId: string;
    colonisedSystems: StarSystem[];
    visibleSystems: StarSystem[];
    exploredSystems: StarSystem[];

    constructor() {
        this.id = generateId();
        const homeSystem = new StarSystem(SystemEnvironment.SUITABLE);
        homeSystem.colony = new Colony(homeSystem.id, this.id, 10000000);
        console.debug(`New Player at ${homeSystem.name}`);

        this.homeSystemId = homeSystem.id;
        this.colonisedSystems = [homeSystem];
        this.visibleSystems = [new StarSystem(), new StarSystem(), new StarSystem()];
        this.exploredSystems = [];
    }

    explore(systemId: string): void {
        const targetSystem = this.visibleSystems.find((item) => systemId === item.id);

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
        const targetSystem = this.exploredSystems.find((item) => systemId === item.id);

        if (targetSystem) {
            if (!this.canColonise(targetSystem.environment)) {
                throw `Cannot colonise system ${systemId}: Not a suitable environment`;
            }

            if (targetSystem.colony) {
                throw `Cannot colonise system ${systemId}: Already colonised`;
            }

            targetSystem.colony = new Colony(systemId, this.id, 100000);
            this.colonisedSystems.push(targetSystem);

            console.debug(`Colonised: ${targetSystem.name}`);

            this.exploredSystems = this.exploredSystems.filter((sys) => sys !== targetSystem);
        } else {
            throw `Cannot colonise system ${systemId}: Could not find matching explored system`;
        }
    }
}
