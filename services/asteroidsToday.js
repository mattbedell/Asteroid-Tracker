const fetch = require('node-fetch');

function getAToday(req, res, next) {
  const NASA_URI = `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${process.env.NASA_KEY}`
  fetch(NASA_URI)
  .then((r) => r.json())
  .then((data) => {
    const aKeys = Object.keys(data.near_earth_objects)
    res.data = data.near_earth_objects[aKeys[0]];
    next()
  })
  .catch((err) => {
    console.log(`---> Error in services > getAToday() : ${err}`);
  })
}
module.exports = {
  getAToday
}
