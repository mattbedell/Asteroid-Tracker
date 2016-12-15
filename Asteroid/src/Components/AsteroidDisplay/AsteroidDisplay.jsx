import React, { Component } from 'react';
import './AsteroidDisplay.css';
import AsteroidImg from "./../../../public/assets/Asteroid.png"
class AsteroidDisplay extends Component {
  constructor(props) {
    super()
    this.verticalOffset = this.generateVerticalOffset(50)
  }
  // vertically offset asteroids by a random number to display them better
  generateVerticalOffset(offsetRange) {
    let verticalOffset = Math.floor(Math.random() * offsetRange);
    if(Math.floor(Math.random() * 2)) {
      return verticalOffset
    } else {
      return verticalOffset * -1
    }
  }
  // alter asteroid position and size based on the scale factor, generate object html properties to apply to asteroid element
  alterAsteroid() {
  const asteroidSize = this.props.asteroid.estimated_diameter_max;
  const asteroidDistance = this.props.asteroid.miss_distance_miles;
  return {
    width: asteroidSize * 100,
    height: asteroidSize * 100,
    left: (asteroidDistance * this.props.distanceScale) - ((asteroidSize * 100) / 2),
    top: this.verticalOffset
  }
}
// generate object of css properties to apply to info display
updateDisplay() {
  const asteroidDistance = this.props.asteroid.miss_distance_miles;
  return {
    left: asteroidDistance * this.props.distanceScale - (120/2),
    top: -100 + this.verticalOffset
  }
}
// generate info overlay box
generateOverlay() {
  let hazard = `${this.props.asteroid.is_potentially_hazardous_asteroid}`
  if(this.props.selected === this.props.asteroid.name) {
    return (
      <div className="overlay" style={this.updateDisplay()}>
        <div className="infoDisplay">
        <p>Velocity: <span>{Math.floor(this.props.asteroid.miles_per_hour)} mph </span></p>
        <p>Distance: <span>{Math.floor(this.props.asteroid.miss_distance_lunar)} LD</span></p>
        <p>Hazard: <span>{hazard}</span></p>
        </div>
        <div className="lineContainer">
          <div className="line"></div>
        </div>
        <div className="circle"></div>
      </div>
    )
  }
}
render() {
  // render asteroid with overlay
  return(
    <div className="AsteroidDisplay">
      <img src={AsteroidImg} alt="asteroid" style={this.alterAsteroid()}></img>
      {this.generateOverlay()}
    </div>
  )
}
}

export default AsteroidDisplay;
