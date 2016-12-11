const router = require('express').Router();

router.route('/test')
  .get((req, res) => res.send('route hit'));

module.exports = router;
