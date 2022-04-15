import React, { Component } from 'react';
import AudioMeter from './audioMeter';


class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = {audiodata: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteFrequencyData(this.dataArray);
    this.setState({ audiodata: this.dataArray });
  // this.setState({ audiodata: this.freqArray });
    this.rafId = requestAnimationFrame(this.tick);
    
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }
  
  render() {
 //   return <AudioVisualizer audiodata={this.state.audiodata} />;
 return (<AudioMeter audiodata={this.state.audiodata} tower={this.props.tower} />
  
 )}
}


export default AudioAnalyser;