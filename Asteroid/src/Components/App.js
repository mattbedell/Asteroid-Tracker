import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'

class App extends Component {
  constructor() {
    super()
    this.state = {
      distanceScale: .03,
    }
  }
  render() {
    return (
      <SolarDisplay
        sizeScale={this.state.distanceScale * 8}
        distanceScale={this.state.distanceScale}
      />
    );
  }
}

export default App;
