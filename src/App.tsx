import React, { useState, useEffect } from 'react';
import './App.css';
import { Keyboard } from './Keyboard';
import * as Tone from 'tone';

interface AppProps {}

function App({}: AppProps) {
  //define new keyboard
  const keyboard = new Keyboard();
  // console.log(keyboard);
  const synth = new Tone.Synth().toDestination();

  //every time a button is pressed pass in the keys value and play that note
  const handleClick = (id: string) => {
    // console.log(id);
    synth.triggerAttackRelease(`${id}`, '8n');
  };

  return (
    <div>
      <h1>Expressive Synth</h1>
      {keyboard.keys.map((key, id) => {
        return (
          <button
            key={id}
            onClick={() => {
              handleClick(key);
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default App;
