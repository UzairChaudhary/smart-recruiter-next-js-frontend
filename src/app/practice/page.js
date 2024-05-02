"use client"
import React from 'react';
import Speech from "react-text-to-speech";


class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <h2>Audio Player</h2>
        <audio controls >
          <source src="/demoInterviewVideo.wav" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <Speech text="This is a fully customized speech component." pitch={1.5} volume={0.5} voiceURI="Microsoft Heera - English (India)">
      {({ speechStatus, isInQueue, start, pause, stop }) => (
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
          <button onClick={stop}>Stop</button>
        </div>
      )}
    </Speech>
      </div>

    );
  }
}

export default AudioPlayer;
