import { generateId } from '../util/EntityId';

export default class Colony {
    id: string;
    systemId: string;
    playerId: string;
    population: number;
    maxPopulation: number;

    constructor(systemId: string, playerId: string, population: number) {
        this.id = generateId();
        this.systemId = systemId;
        this.playerId = playerId;
        this.population = population;
        this.maxPopulation = Math.floor(Math.random() * 10) * population;
    }
}
