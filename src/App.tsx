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

  //allows notes to be played as long as they are held
  const now = Infinity;

  //changes parameters by the id name that comes in
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const proptomodify = event.target.id;
    const newVal = parseFloat(event.target.value);
    setCurrentSynthSettings((prevState) => {
      return { ...prevState, [`${proptomodify}`]: newVal };
    });
  };

  //resets the synth back to the default values
  const reset = () => {
    setCurrentSynthSettings({
      type: 'triangle21',
      attack: 5,
      decay: 5,
      sustain: 0.4,
      release: 4,
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

  useEffect(() => {
    setCurrentSynthSettings(currentSynthSettings);
  }, []);

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
      <div className="control-panel">
        <div className="sliders">
          <div>
            <label htmlFor="Attack">
              <p>Attack {currentSynthSettings.attack}</p>
              <input
                min={0 as number}
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
          <div>
            <label htmlFor="Decay">
              <p>Decay {currentSynthSettings.decay}</p>
              <input
                min={0 as number}
                type="range"
                id={'decay'}
                onChange={(event) => {
                  handleChange(event);
                  console.log(currentSynthSettings.decay);
                }}
                value={currentSynthSettings.decay}
              ></input>
            </label>
          </div>
          <div>
            <label htmlFor="Sustain">
              <p>Sustain {currentSynthSettings.sustain}</p>
              <input
                min={0 as number}
                max={1.0 as number}
                step={0.1 as number}
                type="range"
                id={'sustain'}
                onChange={(event) => {
                  handleChange(event);
                  console.log(currentSynthSettings.sustain);
                }}
                value={currentSynthSettings.sustain}
              ></input>
            </label>
          </div>
          <div>
            <label htmlFor="Release">
              <p>Release {currentSynthSettings.release}</p>
              <input
                min={0 as number}
                type="range"
                id={'release'}
                onChange={(event) => {
                  handleChange(event);
                  console.log(currentSynthSettings.release);
                }}
                value={currentSynthSettings.release}
              ></input>
            </label>
          </div>
        </div>
        <div className="buttons">
          <div>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
