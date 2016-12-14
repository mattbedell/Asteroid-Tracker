const db = require('./../lib/dbConnect.js')

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
      console.log(`---> Error in models -> getAsteroidsByMonth(): ${err}`);
    })
}
module.exports = {
  getAsteroidsByMonth
}
