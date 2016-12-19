import React, { Component } from 'react';
import './SolarDisplay.css';
import AsteroidDisplay from './../AsteroidDisplay/AsteroidDisplay'
//import DistanceDisplay from './../DistanceDisplay/DistanceDisplay'
import EarthImg from "./../../../public/assets/Earth.png";
import MoonImg from "./../../../public/assets/Moon.png"
import MarsImg from "./../../../public/assets/Mars.png"
import ZoomImg from "./../../../public/assets/zoomIn.png"


class SolarDisplay extends Component {
  constructor(props) {
    super()
    // distance and sizes of solar objects in miles
    this.earthDiameter = 8000
    this.moonDiameter = 2200
    this.marsDiameter = 4212
    this.earthMoonDistance = 230000
    this.earthMarsDistance = 139808518
    this.earthCenter = 0;
    this.moonCenter = 0;
  }
  // ------------------- SCALING ---------------------
  // alter earth distance and size based on scale factor, return object of css properties to be applied to earth element
  earthUpdate() {
      let earthSize = this.earthDiameter * this.props.sizeScale
      this.earthCenter = this.earthDiameter/2 * this.props.sizeScale
    return {
      width: earthSize,
      height: earthSize,
      left: this.earthCenter * -1
    }
  }
  // returns object of css properties that detrmines moon size and distanced based of scale factor
  moonUpdate() {
    this.moonCenter = this.moonDiameter/2 * this.props.sizeScale * -1
    let moonSize = this.moonDiameter * this.props.sizeScale
    this.moonCenter += this.earthMoonDistance * this.props.distanceScale
    return {
      width: moonSize,
      height: moonSize,
      left: this.moonCenter
    }
  }
  // moonLabelUpdate() {
  //   let leftOffset = this.moonCenter;
  //   return {
  //     left: this.moonCenter
  //   }
  // }
// returns object of css properties that detrmines mars size and distanced based of scale factor
  marsUpdate() {
    this.marsCenter = this.marsDiameter/2 * this.props.sizeScale * -1
    let marsSize = this.marsDiameter * this.props.sizeScale
    this.marsCenter += this.earthMarsDistance * this.props.distanceScale
    return {
      width: marsSize,
      height: marsSize,
      left: this.marsCenter
    }
  }
  // ------------------- SCALING ---------------------
  // render asteroids based on selected date catagory
  generateAsteroids() {
    let asteroidSelect = this.props.asteroidList.filter((asteroid) => {
      return asteroid.nav_val === this.props.navSelect
    })
    return(
    asteroidSelect.map((asteroid, i) =>
    <AsteroidDisplay
      key={`asteroid${i}`}
      asteroid={asteroid}
      sizeScale={this.props.sizeScale}
      distanceScale={this.props.distanceScale}
      selected={this.props.selected}
    />
  )
)
  }
  // calculate the number of scaled miles at window halfway point
  calcMiles() {
    let halfMark = window.innerWidth/2;
    let miles = Math.floor(halfMark / this.props.distanceScale)
    return miles
  }
  render() {
    return (
      <div className="SolarDisplay">
        <img className="Earth" src={EarthImg} alt="Earth" style={this.earthUpdate()}></img>
        <img className="Moon" src={MoonImg} alt="Moon" style={this.moonUpdate()}></img>
        <img className="Mars" src={MarsImg} alt="mars" style={this.marsUpdate()}></img>
        {this.generateAsteroids()}
        <div className="distanceDisplay" style={{left: window.innerWidth/2 - 100}}>
          <div className="pointer"></div>
          <div className="miles">{this.calcMiles()} miles</div>
        </div>
        <div className="zoomContainer">
          <img src={ZoomImg} alt="zoomImg" style={{left: window.innerWidth - 45, top: 320}}
            onClick={() => this.props.handleZoomInClick()}
            >
          </img>
        </div>
      </div>
    );
  }
}

export default SolarDisplay;
