import { generateId } from '../util/EntityId';

export enum SystemEnvironment {
    NOT_HABITABLE,
    HOSTILE,
    SUITABLE,
}

export type StarSystemType = {
    id: string;
    name: string;
    environment: SystemEnvironment;
    colonyId?: string;
};

export default class StarSystem implements StarSystemType {
    id: string;
    name: string;
    environment: SystemEnvironment;

    constructor(environment?: SystemEnvironment) {
        this.id = generateId();
        this.name = 'S-' + this.id;
        this.environment = environment ? environment : randomEnum(SystemEnvironment);

        console.debug(`New star system ${this.name}`);
    }
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}
