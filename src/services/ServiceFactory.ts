import PlayerService from './PlayerService';
import StarSystemService from './StarSystemService';
import ColonyService from './ColonyService';

export interface Service {
    name: string;
}

const getServices = (): Record<string, Service> => {
    console.log('Initialising services...');
    return {
        PlayerService: PlayerService.Instance,
        StarSystemService: StarSystemService.Instance,
        ColonyService: ColonyService.Instance,
    };
};

export default getServices;
