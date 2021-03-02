import React from 'react';
import StarSystem, { SystemEnvironment } from '../System/System';
import Player from './Player';

type Props = {
    player: Player;
    exploredSystems: StarSystem[];
    visibleSystems: StarSystem[];
    exploreSystem: (id: string) => void;
};

const PlayerComponent: React.FC<Props> = ({ player, exploredSystems, visibleSystems, exploreSystem }: Props) => {
    const playerSystemName = player.homeSystem.name;

    const exploredSystemsDiv = exploredSystems.map((sys) => (
        <div key={sys.name}>
            <h3>{sys.name}</h3>
            <span>{SystemEnvironment[sys.environment]}</span>
        </div>
    ));

    const unexploredSystemsDiv = visibleSystems.map((sys) => (
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
                <span>{SystemEnvironment[player.homeSystem.environment]}</span>
            </fieldset>
            <fieldset>
                <legend>Unexplored Systems</legend>
                {unexploredSystemsDiv}
            </fieldset>
            <fieldset>
                <legend>Explored Systems</legend>
                {exploredSystemsDiv}
            </fieldset>
        </div>
    );
};

export default PlayerComponent;
