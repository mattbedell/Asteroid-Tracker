import React from 'react';
import './AsteroidDisplay.css';
import AsteroidImg from "./../../../public/assets/Asteroid.png"

function alterAsteroid(props) {
  const asteroidSize = props.asteroid.estimated_diameter_max;
  const asteroidDistance = props.asteroid.miss_distance_miles;
  return {
    width: asteroidSize * 100,
    height: asteroidSize * 100,
    left: (asteroidDistance * props.distanceScale) - ((asteroidSize * 100) / 2)
  }
}
function updateDisplay(props) {
  const asteroidDistance = props.asteroid.miss_distance_miles;
  return {
    left: asteroidDistance * props.distanceScale - (120/2),
    top: 95
  }
}
function generateOverlay(props) {
  let hazard = `${props.asteroid.is_potentially_hazardous_asteroid}`
  if(props.selected === props.asteroid.name) {
    return (
      <div className="overlay" style={updateDisplay(props)}>
        <div className="infoDisplay">
        <p>Velocity: <span>{Math.floor(props.asteroid.miles_per_hour)} mph </span></p>
        <p>Distance: <span>{Math.floor(props.asteroid.miss_distance_lunar)} LD</span></p>
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
const AsteroidDisplay = props => (
  <div className="AsteroidDisplay">
    <img src={AsteroidImg} alt="asteroid" style={alterAsteroid(props)}></img>
    {generateOverlay(props)}
  </div>
);

export default AsteroidDisplay;
