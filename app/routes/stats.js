const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/Stats');

router.get('/', StatsController.index);

module.exports = router;