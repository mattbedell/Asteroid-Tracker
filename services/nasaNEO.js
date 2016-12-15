const fetch = require('node-fetch');
// Get today's asteroids from nasa api
function getAToday(req, res, next) {
  const NASA_URI = `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${process.env.NASA_KEY}`
  fetch(NASA_URI)
  .then((r) => r.json())
  .then((data) => {
    const aKeys = Object.keys(data.near_earth_objects)
    //save asteroid list to res.data to be parsed later
    res.data = data.near_earth_objects[aKeys[0]];
    // let parser middleware know what type of data it is recieving
    res.isToday = true;
    res.isHistorical = false;
    next()
  })
  .catch((err) => {
    console.log(`---> Error in services > getAToday() : ${err}`);
  })
}
function getAsteroidsByDateRange(req, res, next) {
  // get asteroid data based on year, month and day
  //start date + 7 days
  const NASA_URI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.params.year}-${req.params.month}-${req.params.day}&api_key=${process.env.NASA_KEY}`
  fetch(NASA_URI)
  .then((r) => r.json())
  .then((data) => {
    // let parser know what type of data it is recieving
    res.isHistorical = true;
    // save data to response object to be parsed and saved to the database later
    res.data = data;
    next();
  })
  .catch((err) => {
    console.log(`---> Error in sevices -> getAsteroidsByDateRange: ${err}`);
  })
}
module.exports = {
  getAToday,
  getAsteroidsByDateRange
}
