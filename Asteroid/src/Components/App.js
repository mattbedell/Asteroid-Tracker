import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'
import AList from './aList/aList'
import ajaxAdapter from './../helpers/AJAXAdapter'

class App extends Component {
  constructor() {
    super()
    this.resetScale = .02;
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
  handleResetZoom() {
    console.log('reset');
    let frameId;
    const zoomIn = (time) => {
      if(Math.round(this.state.distanceScale * 100) / 100 <= this.resetScale) {
        this.setState({
          distanceScale: this.state.distanceScale + this.resetScale
        })
        frameId = window.requestAnimationFrame(zoomIn)
      }
    }
    if(frameId) {
      cancelAnimationFrame(frameId)
    } else {
      frameId = requestAnimationFrame(zoomIn)
    }
  }
  handleAsteroidClick(asteroidDist, selected) {
    if(this.state.frameId) {
      cancelAnimationFrame(this.state.frameId);
    }
    this.setState({
      selected
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
        this.setState({
          frameId
        })
      } else {
        cancelAnimationFrame(frameId);
        this.setState({
          frameId: undefined
        })
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
        this.setState({
          frameId
        })
      } else {
        cancelAnimationFrame(frameId);
        this.setState({
          frameId: undefined
        })
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
          selected={this.state.selected}
          sizeScale={this.state.distanceScale}
          distanceScale={this.state.distanceScale}
          data={this.state.today}
          // resetZoom={() => this.handleResetZoom()}
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
