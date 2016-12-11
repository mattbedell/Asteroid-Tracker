import React from 'react';
import './aList.css';
import TodayItem from './../todayItem/todayItem'
const generateList = (props) =>
  props.data.map((asteroid, i) =>
    <TodayItem
      key={`todayItem${i}`}
      asteroid={asteroid}
      handleAsteroidClick={props.handleAsteroidClick}
      distanceScale={props.distanceScale}
    />
)


const aList = props => (
  <div className="aList">
    <div className="listHeaders">
      <div className="header"><p>Name</p></div>
      <div className="header"><p>Size(mi)</p></div>
      <div className="header"><p>Distance</p></div>
    </div>
    {generateList(props)}
  </div>
);

export default aList;
