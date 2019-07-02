let DnaModel = require('../models/Dna');

class MutantController {
    
    /**
     * @description Retrieve 200 if the dna is mutant or 403 is human.
     * @param {Object} req 
     * @param {Object} res 
     */
    static isMutant(req, res){
        let dna = new DnaModel(req.body.dna);        
        dna.save();
        dna.saveStats();
        
        res.sendStatus( ( dna.isMutant() ? 200 : 403 ) );
    }
}


module.exports = MutantController;


