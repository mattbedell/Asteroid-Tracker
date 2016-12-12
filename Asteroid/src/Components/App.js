import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'
import AList from './aList/aList'
import ajaxAdapter from './../helpers/AJAXAdapter'

class App extends Component {
  constructor() {
    super()
    this.resetScale = .009;
    this.state = {
      distanceScale: .009,
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
  handleAsteroidClick(asteroidDist, selected) {
    this.setState({
      selected: selected
    })
    var frameId;
    let scaleFactor = .00005
    let calcNewDist = asteroidDist;
    const animateFrames = (time) => {
      calcNewDist = asteroidDist * this.state.distanceScale
      if(calcNewDist >= window.innerWidth/2) {
        if(calcNewDist <= window.innerWidth * 3) {
          scaleFactor = .000001
          this.setState({
            distanceScale: this.state.distanceScale - scaleFactor
          })
        } else {
          this.setState({
            distanceScale: this.state.distanceScale - scaleFactor
          })
        }
        console.log(asteroidDist);
        frameId = window.requestAnimationFrame(animateFrames)
      } else {
        cancelAnimationFrame(frameId);
      }
    }
    frameId = window.requestAnimationFrame(animateFrames)
    // let calcNewState = this.state.distanceScale;
    // let calcNewDist = asteroidDist;
    // const scaleInterval = setInterval(() => {
    //   console.log(calcNewDist);
    //   if (calcNewDist >= window.innerWidth/2 && this.state.distanceScale > 0) {
    //     calcNewState -= 0.00002
    //     calcNewDist = asteroidDist * calcNewState
    //     this.setState({
    //       distanceScale: calcNewState
    //     })
    //   } else {
    //     console.log('cleared');
    //     clearInterval(scaleInterval)
    //   }
    // }, 0)
  }
  componentDidMount() {
    this.getToday()
  }
  render() {
    return (
      <div className="bodyContainer">
        <SolarDisplay
          sizeScale={this.state.distanceScale}
          distanceScale={this.state.distanceScale}
          data={this.state.today}
        />
        <AList
          data={this.state.today}
          distanceScale={this.state.distanceScale}
          handleAsteroidClick={(asteroidDist, selected) => this.handleAsteroidClick(asteroidDist, selected)}
        />
      </div>
    );
  }
}

export default App;
