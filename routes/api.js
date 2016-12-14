const router = require('express').Router();
const { getAToday, getAsteroidsByDateRange } = require('./../services/nasaNEO')
const { parseNEOdata, insertAsteroidsIntoDB } = require('./../models/updateDB')
const { getAsteroidsByMonth, getAllAsteroids } = require('./../models/asteroidLookup')

const sendRes = (req, res) => res.json(res.data);
const sendBundle = (req, res) => res.json(res.allAsteroids)
router.route('/test')
  .get((req, res) => res.send('route hit'));

router.route('/today')
  .get(getAToday, sendRes)
router.route('/populateUtil/:year/:month/:day')
  .get(getAsteroidsByDateRange, parseNEOdata, insertAsteroidsIntoDB, sendRes)
router.route('/lookup/all')
  .get(getAllAsteroids, getAToday, parseNEOdata, sendBundle)
router.route('/lookup/:month')
  .get(getAsteroidsByMonth, sendRes)
router.route('/test2')
  .get((req, res) => res.send({thisisatest: 'test'}))

module.exports = router;
