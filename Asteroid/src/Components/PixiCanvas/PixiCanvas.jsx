import React, { Component } from 'react';
var ReactPIXI = require('react-pixi');
var PIXI = require('pixi.js');
import './PixiCanvas.css';
import EarthImg from './Earth.png'

const Stage = React.createFactory(ReactPIXI.Stage);
var Sprite = React.createFactory(ReactPIXI.Sprite);

class PixiCanvas extends Component {
  render() {
    return Stage(
      Sprite({image: EarthImg, y:-35, anchor: new PIXI.Point(0.5,0.5), key:'topping'}, null)
    )
  }
}

export default PixiCanvas;
