import React, { useState, useEffect } from 'react';
import './App.css';
import { Keyboard } from './Keyboard';
import * as Tone from 'tone';

interface AppProps {}

function App({}: AppProps) {
  //define new keyboard from class Keyboard
  const keyboard = new Keyboard();

  // patch
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  //every time a button is pressed pass in the keys value and play that note
  const handleClick = (id: string) => {
    //triggers a note and an attack release time.
    Tone.context.resume().then(() => {
      synth.triggerAttack(`${id}`, '8n', now);
    });
  };

  const release = (id: string) => {
    synth.triggerRelease(`${id}`, now);
  };

  //map out our keyboard with the appropriate keys
  return (
    <div>
      <h1>Expressive Synth</h1>
      <div className="keyboard">
        {keyboard.keys.map((key, id) => {
          return (
            <button
              key={id}
              onMouseDown={() => {
                handleClick(key);
              }}
              onMouseUp={() => {
                release(key);
              }}
              onMouseLeave={() => {
                release(key);
              }}
            >
              <p>{key}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
