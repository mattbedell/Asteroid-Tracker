import React, { Component } from 'react';
import './App.css';
import SolarDisplay from './SolarDisplay/SolarDisplay'
import AList from './aList/aList'
import ajaxAdapter from './../helpers/AJAXAdapter'

class App extends Component {
  constructor() {
    super()
    this.zoomDone = false;
    this.timeoutId = 0;
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
  handleAsteroidClick(asteroidDist, selected) {
    this.zoomDone = true;
    window.clearTimeout(this.timeoutId)
    this.setState({
      selected: selected
    })
    let calcNewDist = asteroidDist * this.state.distanceScale;
    const animateFramesOut = (time) => {
      console.log('run');
      calcNewDist = asteroidDist * this.state.distanceScale
      if(asteroidDist > 225000*3) {
        if(calcNewDist >= window.innerWidth * 3) {
          this.setState({
            distanceScale: this.state.distanceScale - .00005
          })
          calcNewDist = asteroidDist * this.state.distanceScale;
        } else if(calcNewDist >= window.innerWidth/2){
          this.setState({
            distanceScale: this.state.distanceScale - .000001
          })
          calcNewDist = asteroidDist * this.state.distanceScale;
        } else {
          this.zoomDone = true;
        }
      } else if(calcNewDist > window.innerWidth/2){
        this.setState({
          distanceScale: this.state.distanceScale - .00005
        })
        calcNewDist = asteroidDist * this.state.distanceScale;
      } else {
        this.zoomDone = true;
      }
      if(!this.zoomDone) {
        requestAnimationFrame(animateFramesOut)
      }
    }
    const animateFramesIn = (time) => {
      calcNewDist = asteroidDist * this.state.distanceScale;
      if(calcNewDist < window.innerWidth / 3) {
        this.setState({
          distanceScale: this.state.distanceScale + .00005
        })
        calcNewDist = asteroidDist * this.state.distanceScale;
      } else if(calcNewDist < window.innerWidth / 2){
        this.setState({
          distanceScale: this.state.distanceScale + .000001
        })
        calcNewDist = asteroidDist * this.state.distanceScale;
      } else {
        this.zoomDone = true;
      }
      if(!this.zoomDone) {
        requestAnimationFrame(animateFramesIn)
      }
    }
    const pauseResetZoom = () => {
      this.timeoutId = window.setTimeout(() => {
        this.zoomDone = false;
        if(calcNewDist > window.innerWidth/2) {
          requestAnimationFrame(animateFramesOut)
        } else {
          requestAnimationFrame(animateFramesIn)
        }
      }, 70)
    }
    pauseResetZoom()
  }
  handleZoomInClick() {
    this.zoomDone = true;
    const animateZoomOut = () => {
      console.log(Math.round(this.state.distanceScale * 1000)/ 1000);
      if(Math.round(this.state.distanceScale * 1000) / 1000 < this.resetScale) {
        this.setState({
          distanceScale: this.state.distanceScale + .00005
        })
        if(!this.zoomDone) {
          requestAnimationFrame(animateZoomOut)
        }
      } else {
        this.zoomDone = true;
      }
    }
    window.setTimeout(() => {
      this.zoomDone = false;
      requestAnimationFrame(animateZoomOut)
    }, 70)
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
          selected={this.state.selected}
          handleZoomInClick={() => this.handleZoomInClick()}
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
