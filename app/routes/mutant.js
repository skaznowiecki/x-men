let express = require('express');
let router = express.Router();
let MutantController = require('../controllers/Mutant');

router.post('/', MutantController.isMutant);

module.exports = router;
