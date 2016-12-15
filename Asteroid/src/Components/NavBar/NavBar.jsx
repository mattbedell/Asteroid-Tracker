import React from 'react';
import './NavBar.css';
const generateTabs = (props) => {
  let uniqueTabs = {};
  props.asteroidList.forEach((asteroid) => {
    uniqueTabs[asteroid.nav_val] = asteroid.nav_val;
  })
  let tabs = Object.keys(uniqueTabs);
  return(
    tabs.map((tab, i) =>
    <div className='tab' key={`${tab}${i}`} onClick={() => props.handleNavClick(tab)}>{tab}</div>
  )
  )
}
const NavBar= (props) => (
  <div className="navBar">
    {generateTabs(props)}
  </div>
)

export default NavBar;
