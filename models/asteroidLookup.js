const db = require('./../lib/dbConnect.js')
// lookup asteroids in database by month
function getAsteroidsByMonth(req, res, next) {
  console.log(req.params.month);
  db.many(`SELECT * FROM asteroids WHERE
          EXTRACT(MONTH FROM close_approach_date) = $/month/;`, req.params)
    .then((data) => {
      res.data = data;
      console.log(res.data);
      next()
    })
    .catch((err) => {
      console.log(`---> Error in models -> asteroidLookup -> getAsteroidsByMonth(): ${err}`);
    })
}
function getAllAsteroids(req, res, next) {
  //get all asteroids in the database, save to response object to be parsed later
  db.many(`SELECT * FROM asteroids;`)
  .then((data) => {
    res.dataBundle = data
    next()
  })
  .catch((err) => {
    console.log(`---> Error in models -> asteroidLookup -> getAllAsteroids(): ${err}`);
  })
}
module.exports = {
  getAsteroidsByMonth,
  getAllAsteroids
}
