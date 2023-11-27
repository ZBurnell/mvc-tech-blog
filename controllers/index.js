const router = require('express').Router();
const api = require('./api');
const main = require('./mainRoutes.js');
const dashboard = require('./dashboardroutes.js')


router.use('/api', api);
router.use('/', main);
router.use('/dashboard', dashboard);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;