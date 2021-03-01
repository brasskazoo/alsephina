import React from 'react';
import Player from './Player';

type Props = {
    player: Player;
    exploreSystem: (id: string) => void;
};

const PlayerComponent: React.FC<Props> = ({ player, exploreSystem }: Props) => {
    const playerSystemName = player.homeSystem.name;

    const exploredSystems = player.knownSystems
        .filter((sys) => {
            return sys.explored === true;
        })
        .map((sys) => (
            <div key={sys.name}>
                <h3>{sys.name}</h3>
            </div>
        ));

    const unexploredSystems = player.knownSystems
        .filter((sys) => {
            return sys.explored === false;
        })
        .map((sys) => (
            <div key={sys.name}>
                <h3>{sys.name}</h3>
                <button onClick={() => exploreSystem(sys.name)}>Explore...</button>
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
            <fieldset>
                <legend>Explored Systems</legend>
                {exploredSystems}
            </fieldset>
        </div>
    );
};

export default PlayerComponent;
