import React from 'react';
import './NavBar.css';
// return css class if tab is selected
const isSelected = (props, tab) => {
  if(tab === props.navSelect) {
    return ' selected'
  } else {
    return ''
  }
}
// generate a new nav tab for each unique date catagory
const generateTabs = (props) => {
  let uniqueTabs = {};
  props.asteroidList.forEach((asteroid) => {
    uniqueTabs[asteroid.nav_val] = asteroid.nav_val;
  })
  let tabs = Object.keys(uniqueTabs);
  return(
    tabs.map((tab, i) =>
    <div className={`tab${isSelected(props, tab)}`} key={`${tab}${i}`} onClick={() => props.handleNavClick(tab)}>{tab}</div>
  )
  )
}
const NavBar= (props) => (
  <div className="navBar">
    {generateTabs(props)}
  </div>
)

export default NavBar;
