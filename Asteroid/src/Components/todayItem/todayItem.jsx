import React from 'react';
import './todayItem.css';


const todayItem = props => (
  <div className="todayItem"
    onClick={() => props.handleAsteroidClick(props.asteroid.close_approach_data[0].miss_distance.miles, props.asteroid.name)}
    >
    <div className="info"><h4>{props.asteroid.name}</h4></div>
    <div className="info"><p>{props.asteroid.estimated_diameter.miles.estimated_diameter_max}</p></div>
    <div className="info"><p>{props.asteroid.close_approach_data[0].miss_distance.miles}</p></div>
  </div>
);

export default todayItem;
