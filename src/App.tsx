import React, { useState, useEffect } from 'react';
import './App.css';
import ReactTooltip from 'react-tooltip';
import Music from './Music';
//import ToneJS
import * as Tone from 'tone';

//import classes
import { Patches } from './Patches';
import { Keyboard } from './Keyboard';

//Main Function
function App() {
  //Setup React States
  const [currentSynthSettings, setCurrentSynthSettings] = useState({
    type: 'triangle21',
    attack: 5,
    decay: 5,
    sustain: 0.4,
    release: 4,
  });
  const [bank, setBank] = useState('triangle');
  const [hide, setHide] = useState(false);

  //instantiate classes
  const keyboard = new Keyboard();
  const patches = new Patches();

  // set up initial patch
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
    setBank('triangle');
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

  //changes the bank of patches
  const changeBank = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setBank(event.target.id);
    setCurrentSynthSettings((prevState) => {
      return { ...prevState, type: event.target.id + '1' };
    });
  };

  //changes voice in a bank
  const changeVoice = (event: { target: { value: string } }) => {
    console.log(event.target.value);
    setCurrentSynthSettings((prevState) => {
      return { ...prevState, type: event.target.value };
    });
  };

  const hideSplash = () => setHide(!hide);

  useEffect(() => {
    setCurrentSynthSettings(currentSynthSettings);
  }, []);

  return (
    <>
      {hide ? (
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
                    data-tip
                    data-for="attackTip"
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
                <ReactTooltip id="attackTip" place="top" effect="solid">
                  Attack time is the time taken for initial run-up of level from
                  nil to peak, beginning when the key is first pressed.
                </ReactTooltip>
              </div>
              <div>
                <label htmlFor="Decay">
                  <p>Decay {currentSynthSettings.decay}</p>
                  <input
                    data-tip
                    data-for="decayTip"
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
                <ReactTooltip id="decayTip" place="top" effect="solid">
                  Decay time is the time taken for the subsequent run down from
                  the attack level to the designated sustain level.
                </ReactTooltip>
              </div>
              <div>
                <label htmlFor="Sustain">
                  <p>Sustain {currentSynthSettings.sustain}</p>
                  <input
                    data-tip
                    data-for="sustainTip"
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
                  <ReactTooltip id="sustainTip" place="top" effect="solid">
                    Sustain level is the level during the main sequence of the
                    sound's duration, until the key is released.
                  </ReactTooltip>
                </label>
              </div>
              <div>
                <label htmlFor="Release">
                  <p>Release {currentSynthSettings.release}</p>
                  <input
                    data-tip
                    data-for="releaseTip"
                    min={0 as number}
                    type="range"
                    id={'release'}
                    onChange={(event) => {
                      handleChange(event);
                      console.log(currentSynthSettings.release);
                    }}
                    value={currentSynthSettings.release}
                  ></input>
                  <ReactTooltip id="releaseTip" place="top" effect="solid">
                    Release time is the time taken for the level to decay from
                    the sustain level to zero after the key is released.
                  </ReactTooltip>
                </label>
              </div>
            </div>
            <div className="buttons">
              <div>
                <button onClick={reset}>Reset To Default</button>
              </div>
            </div>
            <div className="patch-selector">
              <div className="patch-options">
                {Object.getOwnPropertyNames(patches).map((patch, id) => {
                  return (
                    <label key={`${patch}`}>
                      {patch}
                      <input
                        key={id}
                        name="patchGroup"
                        type="radio"
                        checked={bank === patch}
                        id={patch}
                        onChange={(event) => {
                          changeBank(event);
                        }}
                      ></input>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="osc-selector">
              <div>
                <label>Select a Patch Bank and Voice:</label>
              </div>
              <select name="voices" id="voices" onChange={changeVoice}>
                {patches[bank as keyof Patches].map((voice: string, id) => {
                  return (
                    <option
                      key={id}
                      value={voice}
                      selected={voice === currentSynthSettings.type}
                    >
                      {voice}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <Music hideSplash={hideSplash} />
      )}
    </>
  );
}

export default App;
