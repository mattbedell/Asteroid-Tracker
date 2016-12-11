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
const AsteroidDisplay = props => (
  <div className="AsteroidDisplay">
    <img src={AsteroidImg} alt="asteroid" style={alterAsteroid(props)}></img>
  </div>
);

export default AsteroidDisplay;
