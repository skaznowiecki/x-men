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
            stats.count_mutant_dna++;
            stats.ratio = (stats.count_mutant_dna / stats.count_human_dna).toFixed(2);
            redis.set('stats', JSON.stringify(stats));
        });
    }
    
    /**
     * @description Get stats from Redis.
     */
    static getStats(){
        return new Promise( (resolve) => {
            redis.get('stats', ( _err, stats ) => {
                const currentStats = {
                    count_mutant_dna : 0, 
                    count_human_dna : 0, 
                    ratio: 0.0
                };

                Object.assign(currentStats, JSON.parse(stats));
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
        return this.dna.map(this.analizyRow).reduce((a,b) => a + b);
    }

    /**
     * @description Count of sequence mutant dna has vertical. 
     * @return {Integer}
     */
    analizyVertical(){       
        return this.dna.map((_,i) => this.analizyRow(this.dna.map(e => e.charAt(i))
            .join(''))).reduce((a,b) => a + b);
    }

    /**
     * @description Count of sequence mutant dna has oblique. 
     * @return {Integer}
     */
    analizyOblique(){
        const { length } = this.dna;
        let count = 0;
        this.dna.forEach((_, i) => {
            let row1 = '', row2 = '', j = 0;
            while( (i + j) < length ){
                row1 = row1.concat(this.dna[j].charAt(i + j));
                row2 = row2.concat(this.dna[i + j].charAt(j));
                j++;
            }

            count += this.analizyRow(row1);
            if(row1 != row2) count += this.analizyRow(row2);
        });
        return count;
    }

    /**
     * @description Retrieve number of mutant sequence has the row.
     * @param {String} row
     * @return {Integer}
     */
    analizyRow(row){
        return DNA_SEQUENCES.filter(seq => row.indexOf(seq) !== -1 ).length;
    }
}

module.exports = Dna;
