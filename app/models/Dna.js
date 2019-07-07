const redis = require('../services/Redis');  
const uuidV1 = require('uuid/v1');

const MINIMUM_SEQUENCE = 2;
const DNA_SEQUENCES = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];

class Dna {
    /**
     * @constructor
     * @param {Array} dna  
     */
    constructor(dna){
        this.dna = dna;
        this.validIsMutant = 0;
    }    

    /**
     * @description Save dna's in Redis.
     */
    save(){
        const uuid = uuidV1();
        redis.set(`dna:${uuid}`, JSON.stringify(this.dna) );
    }

    /**
     * @description Save stats of dna in Redis.
     */
    saveStats(){
        Dna.getStats().then((stats) => {
            if(this.validIsMutant)
                stats.count_mutant_dna++;
            else
                stats.count_human_dna++;

            stats.ratio = (stats.count_mutant_dna / stats.count_human_dna).toFixed(2);
            redis.set('stats', JSON.stringify(stats));
        });
    }
    
    /**
     * @description Get stats from Redis.
     */
    static getStats(){
        return new Promise( (resolve) => {
            redis.get('stats', ( err, stats ) => {
                let currentStats = {
                    count_mutant_dna : 0, 
                    count_human_dna : 0, 
                    ratio: 0.0
                };

                if(stats != null){
                    Object.assign(currentStats, JSON.parse(stats));
                }   
                resolve(currentStats);
            });
        });
    }

    /**
     * @description Retrieve if dna is mutant.
     * @return {Boolean}
     */
    isMutant(){
        let count = 0;

        count += this.analizyHorizontal();
        count += this.analizyVertical();
        count += this.analizyOblique();

        this.validIsMutant = (count >= MINIMUM_SEQUENCE);
        return this.validIsMutant;
    }

    /**
     * @description Count of sequence mutant dna has horizontal. 
     * @return {Integer}
     */
    analizyHorizontal(){
        let count = 0;
        this.dna.forEach(row => {
            count += this.analizyRow(row)
        });
        return count;      
    }

    /**
     * @description Count of sequence mutant dna has vertical. 
     * @return {Integer}
     */
    analizyVertical(){       
        let count = 0;
        for(let i in this.dna){
            let row = '';
            this.dna.forEach(sequence => {
                row = row.concat(sequence.charAt(i));
            });
            count += this.analizyRow(row);
        }
        return count;
    }

    /**
     * @description Count of sequence mutant dna has oblique. 
     * @return {Integer}
     */
    analizyOblique(){
        const length = this.dna.length;
        let count = 0;
        
        for(let i in this.dna){
            let row1 = '', row2 = '', j = 0;
            i = parseInt(i);
            while( (i + j) < length ){
                row1 = row1.concat(this.dna[j].charAt(i + j));
                row2 = row2.concat(this.dna[i + j].charAt(j));
                j++;
            }

            if(row1 == row2)
                count += this.analizyRow(row1);
            else{
                count += this.analizyRow(row1);
                count += this.analizyRow(row2);                
            }
        }
        return count;
    }

    /**
     * @description Retrieve number of mutant sequence has the row.
     * @param {String} row
     * @return {Integer}
     */
    analizyRow(row){
        let count = 0;
        DNA_SEQUENCES.forEach( seq => {
            if(row.indexOf(seq) !== -1)
                count++;    
        });
        return count;
    }
}

module.exports = Dna;
