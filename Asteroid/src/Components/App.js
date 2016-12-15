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
      asteroids: [],
      navSelect: ''
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
  getAllAsteroids() {
    ajaxAdapter.getAllAsteroids()
    .then((asteroids) => {
      this.setState({
        asteroids,
        navSelect: 'today'
      })
    })
  }
  handleNavClick(navSelect) {
    console.log(navSelect);
    this.setState({
      navSelect
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
      if(calcNewDist < window.innerWidth / 2) {
        if(calcNewDist > window.innerWidth / 10) {
          this.setState({
            distanceScale: this.state.distanceScale + .000001
          })
          calcNewDist = asteroidDist * this.state.distanceScale;
        } else {
          this.setState({
            distanceScale: this.state.distanceScale + .00005
          })
          calcNewDist = asteroidDist * this.state.distanceScale;
        }
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
    this.getAllAsteroids()
  }
  render() {
    return (
      <div className="bodyContainer">
        <SolarDisplay
          navSelect={this.state.navSelect}
          asteroidList={this.state.asteroids}
          sizeScale={this.state.distanceScale}
          distanceScale={this.state.distanceScale}
          selected={this.state.selected}
          handleZoomInClick={() => this.handleZoomInClick()}
        />
        <AList
          navSelect={this.state.navSelect}
          asteroidList={this.state.asteroids}
          distanceScale={this.state.distanceScale}
          handleNavClick={(tab) => this.handleNavClick(tab)}
          handleAsteroidClick={(asteroidDist, selected) => this.handleAsteroidClick(asteroidDist, selected)}
        />
      </div>
    );
  }
}

export default App;
