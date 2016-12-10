import React, { Component } from 'react';
import './SolarDisplay.css';
import EarthImg from "./../../../public/assets/Earth.png";
import MoonImg from "./../../../public/assets/Moon.png"

class SolarDisplay extends Component {
  constructor(props) {
    super()
    this.earthDiameter = 8000
    this.moonDiameter = 2200
    this.earthMoonDistance = 230000
    this.earthCenter = 0;
    this.moonCenter = this.moonDiameter/2 * props.sizeScale * -1
  }
  earthUpdate() {
    this.earthCenter = this.earthDiameter/2 * this.props.sizeScale
    return {
      width: this.earthDiameter * this.props.sizeScale,
      height: this.earthDiameter * this.props.sizeScale,
      left: this.earthCenter * -1
    }
  }
  moonUpdate() {
    this.moonCenter += this.earthMoonDistance * this.props.distanceScale
    return {
      width: this.moonDiameter * this.props.sizeScale,
      height: this.moonDiameter * this.props.sizeScale,
      left: this.moonCenter
    }
  }
  render() {
    return (
      <div className="SolarDisplay">
        <img className="Earth" src={EarthImg} alt="Earth" style={this.earthUpdate()}></img>
        <img className="Moon" src={MoonImg} alt="Moon" style={this.moonUpdate()}></img>

      </div>
    );
  }
}

export default SolarDisplay;
