import React from 'react';
import './AsteroidDisplay.css';
import AsteroidImg from "./../../../public/assets/Asteroid.png"

function alterAsteroid(props) {
  const asteroidSize = props.asteroid.estimated_diameter.miles.estimated_diameter_max;
  const asteroidDistance = props.asteroid.close_approach_data[0].miss_distance.miles;
  return {
    width: asteroidSize * 100,
    height: asteroidSize * 100,
    left: asteroidDistance * props.distanceScale
  }
}
function generateOverlay(props) {
  let hazard = `${props.asteroid.is_potentially_hazardous_asteroid}`
  if(props.selected === props.asteroid.name) {
    return (
      <div className="overlay" style={updateDisplay(props)}>
        <div className="infoDisplay">
        <p>Velocity: <span>{Math.floor(props.asteroid.close_approach_data[0].relative_velocity.miles_per_hour)} mph </span></p>
        <p>Distance: <span>{Math.floor(props.asteroid.close_approach_data[0].miss_distance.lunar)} LD</span></p>
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
function updateDisplay(props) {
  const asteroidDistance = props.asteroid.close_approach_data[0].miss_distance.miles;
  return {
    left: asteroidDistance * props.distanceScale - (120/2),
    top: 95
  }
const AsteroidDisplay = props => (
  <div className="AsteroidDisplay">
    <img src={AsteroidImg} alt="asteroid" style={alterAsteroid(props)}></img>
  </div>
);

export default AsteroidDisplay;
