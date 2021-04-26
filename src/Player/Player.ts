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

    canColonise = (sysEnv: SystemEnvironment): boolean => {
        return sysEnv === SystemEnvironment.SUITABLE;
    };
}
