import React from 'react';
import './todayItem.css';


const todayItem = props => (
  <div className="todayItem"
    onClick={() => props.handleAsteroidClick(props.asteroid.miss_distance_miles, props.asteroid.name)}
    >
    <div className="info"><h4>{props.asteroid.name}</h4></div>
    <div className="info"><p>{props.asteroid.estimated_diameter_max}</p></div>
    <div className="info"><p>{props.asteroid.miss_distance_miles}</p></div>
  </div>
);

export default todayItem;
