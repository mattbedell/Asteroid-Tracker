import React from 'react';
import './todayItem.css';
const isSelected = (props) => {
  if(props.asteroid.name === props.selected) {
    return ' selected'
  } else {
    return ''
  }
}

const todayItem = props => (
  <div className={`todayItem${isSelected(props)}`}
    onClick={() => props.handleAsteroidClick(props.asteroid.miss_distance_miles, props.asteroid.name)}
    >
    <div className="info"><h4>{props.asteroid.name}</h4></div>
    <div className="info"><h5>{props.asteroid.estimated_diameter_max}</h5></div>
    <div className="info"><h5>{props.asteroid.miss_distance_miles}</h5></div>
  </div>
);

export default todayItem;
