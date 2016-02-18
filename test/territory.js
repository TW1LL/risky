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
        it('returns dice results', function() {
            Eastern_Australia.units = 4;
            Western_Australia.units = 2;
            Ural.units = 2;
            let results = Eastern_Australia.attack(Western_Australia,3,1);
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
    describe('#fortify(territory, units)', function() {
        let board = new Board('default');
        let Eastern_Australia = new Territory(board, 0);
        let Western_Australia = new Territory(board, 1);
        it('returns true and moves units', function() {
            Eastern_Australia.units = 4;
            Western_Australia.units = 2;
            Eastern_Australia.owner = 0;
            Western_Australia.owner = 0;
            assert.isTrue(Eastern_Australia.fortify(Western_Australia, 3));
        });
        it('returns false when owners are not the same', function() {
            Eastern_Australia.units = 4;
            Western_Australia.units = 2;
            Eastern_Australia.owner = 0;
            Western_Australia.owner = 1;
            assert.isFalse(Eastern_Australia.fortify(Western_Australia, 3));
        });
        it('returns false when unit transfer is not valid', function() {
            Eastern_Australia.units = 4;
            Western_Australia.units = 2;
            Eastern_Australia.owner = 0;
            Western_Australia.owner = 0;
            assert.isFalse(Eastern_Australia.fortify(Western_Australia, 5));
        });

    });
});
