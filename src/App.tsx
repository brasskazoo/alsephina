import React, { useState } from 'react';
import PlayerComponent from './Player/PlayerComponent';
import Player from './Player/Player';
import StarSystem from './System/System';

const player = new Player();

function App(): React.ReactElement {
    const handleExploreSystem = (id: string) => {
        thePlayer.explore(id);

        updatePlayer(thePlayer);
        updateColonisedSystems(thePlayer.colonisedSystems);
        updateExploredSystems(thePlayer.exploredSystems);
        updateVisibleSystems(thePlayer.visibleSystems);
    };

    const [thePlayer, updatePlayer] = useState(player);
    const [exploredSystems, updateExploredSystems] = useState<StarSystem[]>(thePlayer.exploredSystems);
    const [visibleSystems, updateVisibleSystems] = useState<StarSystem[]>(thePlayer.visibleSystems);
    const [colonisedSystems, updateColonisedSystems] = useState<StarSystem[]>(thePlayer.colonisedSystems);

    return (
        <div className="App">
            <PlayerComponent
                player={player}
                colonisedSystems={colonisedSystems}
                exploredSystems={exploredSystems}
                visibleSystems={visibleSystems}
                exploreSystem={handleExploreSystem}
            />
        </div>
    );
}

export default App;
