import { customAlphabet } from 'nanoid';

// NanoID Configuration
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

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

    constructor(environment?: SystemEnvironment) {
        this.id = nanoid();
        this.name = 'System_' + this.id;
        this.environment = environment ? environment : randomEnum(SystemEnvironment);
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
