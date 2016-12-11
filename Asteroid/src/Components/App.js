import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'
import AList from './aList/aList'
import ajaxAdapter from './../helpers/AJAXAdapter'

class App extends Component {
  constructor() {
    super()
    this.state = {
      distanceScale: .005,
      today: []
    }
  }
  getToday() {
    ajaxAdapter.getAToday()
    .then((data) => {
      this.setState({
        today: data
      })
    })
  }
  handleAsteroidClick(asteroidDist) {
    let calcNewState = this.state.distanceScale;
    let calcNewDist = asteroidDist;
    const scaleInterval = setInterval(() => {
      console.log(calcNewDist);
      if (calcNewDist >= window.innerWidth/2) {
        calcNewState -= .0001
        calcNewDist = asteroidDist * calcNewState
        this.setState({
          distanceScale: calcNewState
        })
      } else {
        console.log('cleared');
        clearInterval(scaleInterval)
      }
    }, 1000)
  }
  componentDidMount() {
    this.getToday()
  }
  render() {
    return (
      <div className="bodyContainer">
        <SolarDisplay
          sizeScale={this.state.distanceScale * 8}
          distanceScale={this.state.distanceScale}
          data={this.state.today}
        />
        <AList
          data={this.state.today}
          distanceScale={this.state.distanceScale}
          handleAsteroidClick={(asteroidDist) => this.handleAsteroidClick(asteroidDist)}
        />
      </div>
    );
  }
}

export default App;
