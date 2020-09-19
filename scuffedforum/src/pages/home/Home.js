import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h4 className="text-warning"><FontAwesomeIcon icon={faGlobe} size="9x"/></h4>
      <h1 className="text-warning"> Welcome to</h1>
      <h1 className="text-warning"> Scuffed Forum</h1>
      <h3 className="text-light" >Please Login / Register to access</h3>
      </header>
    </div>
  );
}

export default App;
