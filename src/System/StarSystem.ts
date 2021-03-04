export enum SystemEnvironment {
    NOT_HABITABLE,
    HOSTILE,
    SUITABLE,
}

interface ISystem {
    name: string;
    environment: SystemEnvironment;
}

export default class StarSystem implements ISystem {
    name: string;
    environment: SystemEnvironment;

    constructor(environment?: SystemEnvironment) {
        this.name = 'system' + Math.floor(100 * Math.random());
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
