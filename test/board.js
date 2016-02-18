"use strict"
let assert = require("chai").assert;
describe('Board',function() {
    let Board = require('../app/board/board').Board;
    describe('#importMap()',function() {
        it('loads a json file and stores it in the object', function() {
            let board = new Board('default');
            assert.equal(board.map.name,'default');
        });
    });
    describe('#verifyAttack(from,to)', function() {
        it('verifies potential attack with board data', function() {
            let board = new Board('default');
            let posAtk1 = board.map.territories[0]['attack'];
            let notAtk1 = null;
            for(var i = 0; i < board.map.territories.length; i++) {
                if (posAtk1.indexOf(i) === -1) {
                    notAtk1 = i;
                    break;
                }
            }
            assert.isTrue(board.verifyAttack(0,posAtk1[0]));
            assert.isFalse(board.verifyAttack(0,notAtk1));
        });
    });
    describe('#verifyFortify(from,to)', function() {
        it('verifies potential fortification with board data', function() {
            let board = new Board('default');
            let posAtk1 = board.map.territories[0]['fortify'];
            let notAtk1 = null;
            for(var i = 0; i < board.map.territories.length; i++) {
                if (posAtk1.indexOf(i) === -1) {
                    notAtk1 = i;
                    break;
                }
            }
            assert.isTrue(board.verifyFortify(0,posAtk1[0]));
            assert.isFalse(board.verifyFortify(0,notAtk1));
        });
    });
    describe('#getContinent(territory)', function() {
        it('returns the id of the continent the territory is in', function() {
            let board = new Board('default');
            assert.equal(board.getContinent(0), 0);
            assert.notEqual(board.getContinent(5),0);
        });
    });
    describe('#getTerritories(continent)', function() {
        it('returns a list of the territories in the given continent', function() {
            let board = new Board('default');
            assert.isTrue(board.getTerritories(0).indexOf(0) !== -1);
            assert.isFalse(board.getTerritories(1).indexOf(0) !== -1);
        });
    });
    describe('#containsAllTerritories(terr,cont)', function() {
        it('returns a boolean if the terr Array contains all of the continent\'s territory array ', function() {
            let board = new Board('default');
            assert.isTrue(board.containsAllTerritories([0,1,2,3], 0));
            assert.isFalse(board.containsAllTerritories([0,1,2,3], 1));
        });
    });
});
