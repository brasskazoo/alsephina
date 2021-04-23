import { StarSystemType, SystemEnvironment } from '../System/StarSystem';
import { generateId } from '../util/EntityId';
import { ColonyType } from '../StarSystemColony/Colony';

export type PlayerType = {
    id: string;
    homeSystemId: string;
    visibleSystems: StarSystemType[];
    exploredSystems: StarSystemType[];
    colonisedSystems: StarSystemType[];
    colonies: ColonyType[];
};

export default class Player implements PlayerType {
    id;
    homeSystemId = '';
    colonisedSystems = [];
    visibleSystems = [];
    exploredSystems = [];
    colonies = [];

    constructor() {
        this.id = generateId();
    }

    explore(_systemId: string): void {
        // const targetSystem = this.visibleSystems.find((item) => systemId === item.id);
        //
        // if (targetSystem) {
        //     this.exploredSystems.push(targetSystem);
        //     console.debug(`Explored: ${targetSystem.name}`);
        //
        //     const newSystemCount = Math.floor(Math.random() * 5);
        //     console.debug(`Discovered ${newSystemCount} new star systems`);
        //
        //     for (let i = 0; i < newSystemCount; i++) {
        //         const s = new StarSystem();
        //         console.debug(`Discovered: ${s.name}`);
        //         // TODO Check for duplicate IDs
        //         this.visibleSystems.push(s);
        //     }
        //
        //     this.visibleSystems = this.visibleSystems.filter((sys) => sys !== targetSystem);
        // } else {
        //     throw `Cannot explore system ${systemId}: Could not find matching visible system`;
        // }
    }

    canColonise = (sysEnv: SystemEnvironment): boolean => {
        return sysEnv === SystemEnvironment.SUITABLE;
    };

    colonise(_systemId: string): void {
        // const targetSystem = this.exploredSystems.find((item) => systemId === item.id);
        //
        // if (targetSystem) {
        //     if (!this.canColonise(targetSystem.environment)) {
        //         throw `Cannot colonise system ${systemId}: Not a suitable environment`;
        //     }
        //
        //     // if (targetSystem.colonyId) {
        //     //     throw `Cannot colonise system ${systemId}: Already colonised`;
        //     // }
        //
        //     // targetSystem.colony = new Colony(systemId, this.id, 100000);
        //     // this.colonisedSystems.push(targetSystem);
        //
        //     console.debug(`Colonised: ${targetSystem.name}`);
        //
        //     this.exploredSystems = this.exploredSystems.filter((sys) => sys !== targetSystem);
        // } else {
        //     throw `Cannot colonise system ${systemId}: Could not find matching explored system`;
        // }
    }
}
