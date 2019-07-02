let DnaModel = require('../models/Dna');

class StatsController {
    
    /**
     * @description Retrieve stats of mutants and humans.
     * @param {Object} req 
     * @param {Object} res 
     */
    static index(req, res){
        DnaModel.getStats().then( data => {
            res.json(data);
        });   
    }
}


module.exports = StatsController;


