import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'

class App extends Component {
  constructor() {
    super()
    this.state = {
      sizeScale: .03,
    }
  }
  render() {
    return (
      <SolarDisplay
        sizeScale={this.state.sizeScale}
        distanceScale={this.state.sizeScale / 2}
      />
    );
  }
}

export default App;
