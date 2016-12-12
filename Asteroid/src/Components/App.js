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
      distanceScale: .02,
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
    const animateFramesOut = (time) => {
      calcNewDist = asteroidDist * this.state.distanceScale
      if(calcNewDist >= window.innerWidth/2) {
        if(calcNewDist <= window.innerWidth * 3) {
          scaleFactor = .000001
          this.setState({
            distanceScale: this.state.distanceScale - scaleFactor
          })
        } else {
          scaleFactor = .00005
          this.setState({
            distanceScale: this.state.distanceScale - scaleFactor
          })
        }
        frameId = window.requestAnimationFrame(animateFramesOut)
      } else {
        cancelAnimationFrame(frameId);
      }
    }
    const animateFramesIn = (time) => {
      calcNewDist = asteroidDist * this.state.distanceScale
      if(calcNewDist <= window.innerWidth/2) {
        if(calcNewDist >= window.innerWidth / 3) {
          scaleFactor = .000001
          this.setState({
            distanceScale: this.state.distanceScale + scaleFactor
          })
        } else {
          scaleFactor = .00005
          this.setState({
            distanceScale: this.state.distanceScale + scaleFactor
          })
        }
        frameId = window.requestAnimationFrame(animateFramesIn)
      } else {
        cancelAnimationFrame(frameId);
      }
    }
    if(asteroidDist * this.state.distanceScale > window.innerWidth/2) {
      frameId = window.requestAnimationFrame(animateFramesOut)
    } else {
      console.log('request zoom out');
      frameId = window.requestAnimationFrame(animateFramesIn)
    }
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
