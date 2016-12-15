import React from 'react';
import './aList.css';
import TodayItem from './../todayItem/todayItem'
import NavBar from './../NavBar/NavBar'
const generateList = (props) => {
  let asteroidSelect = props.asteroidList.filter((asteroid)  => {
    return asteroid.nav_val === props.navSelect
  })
  return(
  asteroidSelect.map((asteroid, i) =>
    <TodayItem
      key={`todayItem${i}`}
      asteroid={asteroid}
      handleAsteroidClick={props.handleAsteroidClick}
      distanceScale={props.distanceScale}
      selected={props.selected}
    />
)
)
}


const aList = props => (
  <div className="aList">
    <div className="navBar">
      <NavBar
        navSelect={props.navSelect}
        asteroidList={props.asteroidList}
        handleNavClick={props.handleNavClick}
      />
    </div>
    <div className="listHeaders">
      <div className="header"><p>Name</p></div>
      <div className="header"><p>Size(mi)</p></div>
      <div className="header"><p>Distance(mi)</p></div>
    </div>
    <div className="listContainer">
      {generateList(props)}
    </div>
  </div>
);

export default aList;
