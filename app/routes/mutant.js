const express = require('express');
const router = express.Router();
const MutantController = require('../controllers/Mutant');

router.post('/', MutantController.isMutant);

module.exports = router;
