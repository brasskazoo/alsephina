interface ISystem {
    name: string;
    explored: boolean;
    // occupied: boolean
}

export default class StarSystem implements ISystem {
    name: string;
    explored: boolean;

    constructor() {
        this.name = 'system' + Math.floor(100 * Math.random());
        this.explored = false;
    }

    explore(): void {
        console.debug(`Exploring: ${this.name}`);
        this.explored = true;
    }
}
