import React, { Component} from 'react';
import CountryGame from './CountryGame';

class App extends Component {
  render() {
    return (
      <div className="App container text-center">
        <header>
          <h1 className="mt-2">Guess Flag Game</h1>
        </header>
        <CountryGame />
      </div>
    );
  }
}

export default App;