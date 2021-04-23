import { generateId } from '../util/EntityId';

export type ColonyType = {
    id: string;
    systemId: string;
    playerId: string;
    population: number;
    maxPopulation: number;
};

export default class Colony implements ColonyType {
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
        this.maxPopulation = Math.floor(Math.random() * 10) * 20000000;
    }
}
