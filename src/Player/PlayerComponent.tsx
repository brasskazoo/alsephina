import React from 'react';
import Player from './Player';

type Props = {
    player: Player;
};

const PlayerComponent: React.FC<Props> = ({ player }: Props) => {
    // let unexploredSystems: StarSystem[] = player.knownSystems;
    const playerSystemName = player.homeSystem.name;

    const unexploredSystems = player.knownSystems
        .filter((sys) => {
            return sys.explored === false;
        })
        .map((sys) => (
            <div key={sys.name}>
                <h3>{sys.name}</h3>
                <button>Explore...</button>
            </div>
        ));

    return (
        <div>
            <h2>Player</h2>
            <fieldset>
                <legend>Home</legend>
                <h3>{playerSystemName}</h3>
            </fieldset>
            <fieldset>
                <legend>Unexplored Systems</legend>
                {unexploredSystems}
            </fieldset>
        </div>
    );
};

export default PlayerComponent;
