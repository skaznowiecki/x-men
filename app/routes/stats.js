let express = require('express');
let router = express.Router();
let StatsController = require('../controllers/Stats');

router.get('/', StatsController.index);

module.exports = router;
