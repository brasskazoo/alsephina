import { generateId } from '../util/EntityId';

export default class Colony {
    id: string;
    systemId: string;
    playerId: string;
    population: number;

    constructor(systemId: string, playerId: string, population: number) {
        this.id = generateId();
        this.systemId = systemId;
        this.playerId = playerId;
        this.population = population;
    }
}
