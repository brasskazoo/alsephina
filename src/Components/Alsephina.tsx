import React, { useState } from 'react';
import postal from 'postal';
import ServiceFactory from '../services/ServiceFactory';
import { PlayerType } from '../Player/Player';
import { StarSystemType } from '../System/StarSystem';
import PlayerComponent from '../Player/PlayerComponent';
import { ColonyType } from '../StarSystemColony/Colony';

// Init service factory
ServiceFactory();

function App(): React.ReactElement {
    const [thePlayer, updatePlayer] = useState<PlayerType>();
    const [visibleSystems, updateVisibleSystems] = useState<StarSystemType[]>([]);
    // const [colonisedSystems, updateColonisedSystems] = useState<StarSystemType[]>([]);
    const [colonies, updateColonies] = useState<ColonyType[]>([]);

    postal.subscribe({
        channel: 'player',
        topic: 'player.updated',
        callback: function (data, envelope) {
            console.log(envelope);
            console.log(data);

            updatePlayer(data.player);
            updateVisibleSystems(data.player?.visibleSystems);
            // updateColonisedSystems(data.player?.colonisedSystems);
            updateColonies(data.player?.colonies);
        },
    });

    return (
        <div className="App">
            <h1>Ascension to Alsephina</h1>
            <fieldset>
                <button
                    onClick={() => {
                        postal.publish({ channel: 'player', topic: 'create.new' });
                    }}
                >
                    New Player
                </button>
            </fieldset>

            <span>Player: {thePlayer?.id}</span>

            <PlayerComponent
                player={thePlayer}
                colonies={colonies}
                exploredSystems={[]}
                visibleSystems={visibleSystems}
                exploreSystem={() => {
                    alert('Explore!');
                }}
                coloniseSystem={() => {
                    alert('Colonise!');
                }}
            />
        </div>
    );
}

export default App;
