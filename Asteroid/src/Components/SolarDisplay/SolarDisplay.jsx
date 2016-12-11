import React, { Component } from 'react';
import './SolarDisplay.css';
import AsteroidDisplay from './../AsteroidDisplay/AsteroidDisplay'
import EarthImg from "./../../../public/assets/Earth.png";
import MoonImg from "./../../../public/assets/Moon.png"


class SolarDisplay extends Component {
  constructor(props) {
    super()
    this.earthDiameter = 8000
    this.moonDiameter = 2200
    this.earthMoonDistance = 230000
    this.earthMarsDistance = 139808518
    this.earthCenter = 0;
    this.moonCenter = 0;
  }
  // ------------------- SCALING ---------------------
  earthUpdate() {
    let earthSize = 0;
    if(this.props.sizeScale >= 0.0072) {
      earthSize = this.earthDiameter * this.props.sizeScale
      this.earthCenter = this.earthDiameter/2 * this.props.sizeScale
    } else {
      earthSize = this.earthDiameter * 0.0072
      this.earthCenter = this.earthDiameter/2 * 0.0072
    }
    return {
      width: earthSize,
      height: earthSize,
      left: this.earthCenter * -1
    }
  }
  moonUpdate() {
    let moonSize = 0;
    if(this.props.sizeScale >= 0.0072) {
      this.moonCenter = this.moonDiameter/2 * this.props.sizeScale * -1
      moonSize = this.moonDiameter * this.props.sizeScale
    } else {
      this.moonCenter = this.moonDiameter/2 * 0.0072 * -1
      moonSize = this.moonDiameter * 0.0072
    }
    this.moonCenter += this.earthMoonDistance * this.props.distanceScale
    return {
      width: moonSize,
      height: moonSize,
      left: this.moonCenter
    }
  }
  // ------------------- SCALING ---------------------

  generateAsteroids() {
    return(
    this.props.data.map((asteroid, i) =>
    <AsteroidDisplay
      key={`asteroid${i}`}
      asteroid={asteroid}
      sizeScale={this.props.sizeScale}
      distanceScale={this.props.distanceScale}
    />
  )
)
  }
  render() {
    return (
      <div className="SolarDisplay">
        <img className="Earth" src={EarthImg} alt="Earth" style={this.earthUpdate()}></img>
        <img className="Moon" src={MoonImg} alt="Moon" style={this.moonUpdate()}></img>
        {this.generateAsteroids()}
      </div>
    );
  }
}

export default SolarDisplay;
