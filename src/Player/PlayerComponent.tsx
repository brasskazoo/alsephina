import React from 'react';
import StarSystem, { SystemEnvironment } from '../System/StarSystem';
import Player, { PlayerType } from './Player';
import { ColonyType } from '../StarSystemColony/Colony';

type Props = {
    player: Player | PlayerType | undefined;
    colonies: ColonyType[];
    exploredSystems: StarSystem[];
    visibleSystems: StarSystem[];
    exploreSystem: (id: string) => void;
    coloniseSystem: (id: string) => void;
};

const PlayerComponent: React.FC<Props> = ({
    player,
    colonies,
    exploredSystems,
    visibleSystems,
    exploreSystem,
}: Props) => {
    const colonisedSystemsDiv = colonies.map((colony: ColonyType) => {
        const popByMillion = colony.population / 1000000;
        const popString = popByMillion > 1 ? Math.round(popByMillion) : popByMillion.toFixed(1);
        const maxPopString = colony.maxPopulation / 1000000;

        const colonySystem = visibleSystems.find((sys) => sys.id === colony.systemId);

        return (
            <div key={colony.systemId}>
                <h3>
                    {colonySystem?.name}
                    {colony.systemId === player?.homeSystemId ? ' [Home]' : ''}
                </h3>
                <span>
                    Population: {popString}m (max {maxPopString})
                </span>
            </div>
        );
    });

    const colonySystemIds = colonies.map((c) => c.systemId);

    const exploredSystemsDiv = exploredSystems.map((sys) => {
        if (!colonySystemIds.includes(sys.id)) {
            return (
                <div key={sys.id}>
                    <h3>{sys.name}</h3>
                    <span>{SystemEnvironment[sys.environment]}</span>
                </div>
            );
        }
    });

    const unexploredSystemsDiv = visibleSystems.map((sys) => {
        if (!colonySystemIds.includes(sys.id)) {
            return (
                <div key={sys.id}>
                    <h3>{sys.name}</h3>
                    <button onClick={() => exploreSystem(sys.id)}>Explore...</button>
                </div>
            );
        }
    });

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
