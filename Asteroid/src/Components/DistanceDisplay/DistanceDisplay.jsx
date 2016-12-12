import React from 'react';
import './DistanceDisplay.css';

function adjustDistance(props) {
  let width = 150;
  let halfMark = window.innerWidth/2 - (width/2);
  return {
    middle: window.innerWidth/2,
    left: halfMark,
    width: width,
    height: width/2,
    halfMark: halfMark
  }
}
function calcMiles(props) {
  let positionData = adjustDistance(props)
  let miles = positionData.middle / props.distanceScale
  console.log(Math.floor(miles));
}
const DistanceDisplay = props => (
  <div className="DistanceDisplay" style={adjustDistance(props)}>
    {calcMiles(props)}
  </div>
);

export default DistanceDisplay;
