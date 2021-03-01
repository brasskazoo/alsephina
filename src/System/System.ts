interface ISystem {
    name: string;
    // occupied: boolean
}

export default class StarSystem implements ISystem {
    name: string;

    constructor() {
        this.name = 'system' + Math.floor(100 * Math.random());
    }
}
