import React from 'react';
import './music.css';

interface Props {
  hideSplash: () => void;
}

const Music = (props: Props) => {
  return (
    <>
      <h1 className="splash-h1">Expressive Synth</h1>
      <h2 className="splash-h2">
        A Multi-Voice Synth Made With React, TypeScript and{' '}
        <a href="https://tonejs.github.io/">Tone.JS</a>
      </h2>
      <div className="splash-btn-ctr">
        <button className="splash-btn" onClick={props.hideSplash}>
          Make Some Noise!
        </button>
      </div>
      <h2 className="splash-h2">
        Created by <a href="https://arlmedia.ca/">Andrew Lloyd</a>
      </h2>
      <h3 className="splash-h3">
        For
        <a href="https://mintbean.io/meets/f37792a1-a576-4de7-8e27-1c6a34e91da8?template=meet">
          Mintbean's JS MusicHacks: Web-Beats Hackathon!
        </a>
      </h3>
      <div className="musicnotes">
        <div className="note1">&#9835; &#9833;</div>
        <div className="note2">&#9833;</div>
        <div className="note3">&#9839; &#9834;</div>
        <div className="note4">&#9834;</div>
      </div>
    </>
  );
};

export default Music;
