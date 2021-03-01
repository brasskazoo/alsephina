import React, { useState } from 'react';
import PlayerComponent from './Player/PlayerComponent';
import Player from './Player/Player';

const player = new Player();

function App(): React.ReactElement {
    const handleExploreSystem = (id: string) => {
        const targetSystem = thePlayer.knownSystems.find((item) => id === item.name);

        const updatedSystems = thePlayer.knownSystems.map((sys) => {
            if (sys == targetSystem) {
                sys.explore();
            }
            return sys;
        });

        updatePlayer({ ...thePlayer, knownSystems: updatedSystems });
    };

    const [thePlayer, updatePlayer] = useState(player);

    return (
        <div className="App">
            <PlayerComponent player={player} exploreSystem={handleExploreSystem} />
        </div>
    );
}

export default App;
