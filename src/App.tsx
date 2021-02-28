import React, { ReactElement } from 'react';
import PlayerComponent from './Player/PlayerComponent';
import Player from './Player/Player';

const player = new Player();

function App(): ReactElement {
  console.log(React.version) // This is  a hack
  return (
    <div className="App">
      
      <PlayerComponent player={player}/>
    </div>
  );
}

export default App;
