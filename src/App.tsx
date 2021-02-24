import React, { useState, useEffect } from 'react';
import './App.css';
import { Keyboard } from './Keyboard';
import * as Tone from 'tone';

interface AppProps {}

function App({}: AppProps) {
  const [currentSynthSettings, setCurrentSynthSettings] = useState({
    type: 'triangle21',
    attack: 5,
    decay: 5,
    sustain: 0.4,
    release: 4,
  });
  //define new keyboard from class Keyboard
  const keyboard = new Keyboard();

  // patch
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: currentSynthSettings.type as 'custom',
    },
    envelope: {
      attack: currentSynthSettings.attack,
      decay: currentSynthSettings.decay,
      sustain: currentSynthSettings.sustain,
      release: currentSynthSettings.release,
    },
  }).toDestination();

  const now = Tone.now();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id);
    console.log(event.target.value);
    const newAttack = parseInt(event.target.value);
    setCurrentSynthSettings((prevState) => {
      return { ...prevState, attack: newAttack };
    });
  };

  //every time a button is pressed pass in the keys value and play that note
  const handleClick = (id: string) => {
    //triggers a note and an attack release time.
    Tone.context.resume().then(() => {
      console.log(synth);
      synth.triggerAttackRelease(`${id}`, now);
    });
  };

  const release = (id: string) => {
    synth.triggerRelease(`${id}`);
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
              className={key}
              onMouseDown={() => {
                handleClick(key);
              }}
              onMouseUp={() => {
                release(key);
              }}
              onMouseLeave={() => {
                release(key);
              }}
            ></button>
          );
        })}
      </div>
      <div>
        <label htmlFor="Attack">
          Attack {currentSynthSettings.attack}
          <input
            min={0}
            type="range"
            id={'attack'}
            onChange={(event) => {
              handleChange(event);
              console.log(currentSynthSettings.attack);
            }}
            value={currentSynthSettings.attack}
          ></input>
        </label>
      </div>
    </div>
  );
}

export default App;
