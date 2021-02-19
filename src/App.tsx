import React, { useState, useEffect } from 'react';
import './App.css';
import * as Tone from 'tone';

interface AppProps {}

function App({}: AppProps) {
  const synth = new Tone.Synth().toDestination();
  const handleClick = () => {
    synth.triggerAttackRelease('C4', '8n');
  };

  return (
    <div>
      <h1>Expressive Synth</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
