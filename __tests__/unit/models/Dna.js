
const dummyData = require("../../stub/dna");
let Dna = require("../../../app/models/Dna.js");
let redis = require('../../../app/services/Redis.js');

afterAll(() => redis.quit());


test("[analizyHorizontal] expect three mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.horizontal.threeSequence);
    expect(3).toBe(dnaModel.analizyHorizontal());
});

test("[analizyHorizontal] expect cero mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.horizontal.ceroSequence);
    expect(0).toBe(dnaModel.analizyHorizontal());
});

test("[analizyVertical] expect cero mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.vertical.ceroSequence);
    expect(0).toBe(dnaModel.analizyVertical());
});

test("[analizyVertical] expect two mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.vertical.twoSequence);
    expect(2).toBe(dnaModel.analizyVertical());
});

test("[analizyOblique] expect cero mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.oblique.ceroSequence);
    expect(0).toBe(dnaModel.analizyOblique());
});

test("[analizyOblique] expect two mutant's sequence", () => {
    let dnaModel = new Dna(dummyData.oblique.twoSequence);
    expect(2).toBe(dnaModel.analizyOblique());
});

test("[isMutant] expect true with three dna sequence", () => {
    let dnaModel = new Dna(dummyData.mutant);
    expect(true).toEqual(dnaModel.isMutant());
});

test("[isMutant] expect false with one dna sequence", () => {
    let dnaModel = new Dna(dummyData.human);
    expect(false).toEqual(dnaModel.isMutant());
});

test("[analizyRow] expect cero assert with cero dna sequence", () => {
    let dnaModel = new Dna([]);
    expect(0).toEqual(dnaModel.analizyRow(dummyData.analizyRow.ceroAssert));
});

test("[analizyRow] expect one assert with one dna sequence", () => {
    let dnaModel = new Dna([]);
    expect(1).toEqual(dnaModel.analizyRow(dummyData.analizyRow.oneAssert));
});

test("[analizyRow] expect two assert with two dna sequence", () => {
    let dnaModel = new Dna([]);
    expect(2).toEqual(dnaModel.analizyRow(dummyData.analizyRow.twoAssert));
});