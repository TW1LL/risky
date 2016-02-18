"use strict"
let assert = require("chai").assert;
describe('Territory', function() {
    let Board = require('../app/board/board').Board;
    let Territory = require('../app/board/territory').Territory;
    describe('#attack(board, territory, units, count)', function() {
        let board = new Board('default');
        let Eastern_Australia = new Territory(board, 0);
        let Western_Australia = new Territory(board, 1);
        let Ural = new Territory(board, 13);
        it('confirms attack, rolls for both sides, and returns results', function() {
            Eastern_Australia.units = 3;
            Western_Australia.units = 2;
            Ural.units = 2;
            let results = Eastern_Australia.attack(Western_Australia,2,1);
            assert.isArray(results);

        });
        it('returns false when territory is not in range', function() {
            assert.isFalse(Eastern_Australia.attack(Ural,3,1));
        });
        it('returns false when there is not enough units to attack with', function() {
            Eastern_Australia.units = 1;
            assert.isFalse(Eastern_Australia.attack(Western_Australia,1,1));
        });
    });
});
