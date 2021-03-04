import React from 'react';
import StarSystem, { SystemEnvironment } from '../System/System';
import Player from './Player';

type Props = {
    player: Player;
    colonisedSystems: StarSystem[];
    exploredSystems: StarSystem[];
    visibleSystems: StarSystem[];
    exploreSystem: (id: string) => void;
    coloniseSystem: (id: string) => void;
};

const PlayerComponent: React.FC<Props> = ({
    player,
    colonisedSystems,
    exploredSystems,
    visibleSystems,
    exploreSystem,
    coloniseSystem,
}: Props) => {
    const colonisedSystemsDiv = colonisedSystems.map((sys) => (
        <div key={sys.name}>
            <h3>
                {sys.name}
                {sys.name === player.homeSystemName ? ' [Home]' : ''}
            </h3>
            <span>{SystemEnvironment[sys.environment]}</span>
        </div>
    ));

    const exploredSystemsDiv = exploredSystems.map((sys) => (
        <div key={sys.name}>
            <h3>{sys.name}</h3>
            <span>{SystemEnvironment[sys.environment]}</span>
            <span>
                {player.canColonise(sys.environment) && (
                    <button onClick={() => coloniseSystem(sys.name)}>Colonise...</button>
                )}
            </span>
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
                <legend>My Systems</legend>
                {colonisedSystemsDiv}
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
