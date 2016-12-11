const router = require('express').Router();
const { getAToday } = require('./../services/asteroidsToday')

const sendRes = (req, res) => res.json(res.data);
//const sendResponse = (req, res) => res.json(res.data);
router.route('/test')
  .get((req, res) => res.send('route hit'));

router.route('/today')
  .get(getAToday, sendRes)
router.route('/test2')
  .get((req, res) => res.send({thisisatest: 'test'}))

module.exports = router;
