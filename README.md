# Asteroid-Tracker
Close Earth Orbit Asteroid Tracker

https://asteroid-tracker.herokuapp.com/

![alt text](https://github.com/mattBedell/Asteroid-Tracker/blob/master/assets/app%20screenshot.png?raw=true "App")

### Technologies
* React
* Node.js
* Express.js

### Design
Full stack application with a React front end and a Node.js backend.  Connects to the NEO Nasa API to display currently orbiting asteroids as well as historical data.
Distances and Earth/Moon sizes are to scale, asteroid sizes are 100 times larger than they would normally appear.


#### Initial Wireframes
![alt text](https://github.com/mattBedell/Asteroid-Tracker/blob/master/assets/wireframe.jpg?raw=true
 "Wireframe")

### Challenges
* Calculating orbits based off NASA's data proved more difficult than anticipated, pivoted to showing relative distances of asteroids instead.
* Scaling gets progressively faster at large distances, stopping asteroids at center of screen was a challenge
* Scaling speeds and the FPS upper limits of the browser results in slow animations when the scale is larger.

### Planned Features
* Twitter panic button that posts asteroid information to the user's profile
* Experimentation with smarter React renderering, having the data determine which UI components render
* Admin panel for database management
* More info on Asteroid overlay
