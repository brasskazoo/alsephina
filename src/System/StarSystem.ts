import Colony from '../StarSystemColony/Colony';
import { generateId } from '../util/EntityId';

export enum SystemEnvironment {
    NOT_HABITABLE,
    HOSTILE,
    SUITABLE,
}

interface ISystem {
    id: string;
    name: string;
    environment: SystemEnvironment;
}

export default class StarSystem implements ISystem {
    id: string;
    name: string;
    environment: SystemEnvironment;
    colony: Colony | undefined;

    constructor(environment?: SystemEnvironment, colony?: Colony) {
        this.id = generateId();
        this.name = 'System_' + this.id;
        this.environment = environment ? environment : randomEnum(SystemEnvironment);
        this.colony = colony;
    }
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
}
