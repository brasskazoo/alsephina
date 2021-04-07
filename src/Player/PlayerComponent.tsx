import React from 'react';
import StarSystem, { SystemEnvironment } from '../System/StarSystem';
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
    const colonisedSystemsDiv = colonisedSystems.map((sys) => {
        let popString;
        if (sys.colony) {
            const popByMillion = sys.colony.population / 1000000;
            popString = popByMillion > 1 ? Math.round(popByMillion) : popByMillion.toFixed(1);
        }

        return (
            <div key={sys.id}>
                <h3>
                    {sys.name}
                    {sys.id === player.homeSystemId ? ' [Home]' : ''}
                </h3>
                <span>Population: {popString}</span>
            </div>
        );
    });

    const exploredSystemsDiv = exploredSystems.map((sys) => (
        <div key={sys.id}>
            <h3>{sys.name}</h3>
            <span>{SystemEnvironment[sys.environment]}</span>
            <span>
                {player.canColonise(sys.environment) && (
                    <button onClick={() => coloniseSystem(sys.id)}>Colonise...</button>
                )}
            </span>
        </div>
    ));

    const unexploredSystemsDiv = visibleSystems.map((sys) => (
        <div key={sys.id}>
            <h3>{sys.name}</h3>
            <button onClick={() => exploreSystem(sys.id)}>Explore...</button>
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
