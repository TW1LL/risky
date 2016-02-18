"use strict"
let assert = require("chai").assert;
describe('Board',function() {
    let Board = require('../app/board/board').Board;
    describe('#importMap()',function() {
        it('loads a json file and stores it in the object', function() {
            let board = new Board('default');
            assert.equal(board.board.name,'default');
        });
    });
    describe('#verifyAttack(from,to)', function() {
        it('verifies potential attack with board data', function() {
            let board = new Board('default');
            let posAtk1 = board.board.territories[0]['attack'];
            let notAtk1 = null;
            for(var i = 0; i < board.board.territories.length; i++) {
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
            let posAtk1 = board.board.territories[0]['fortify'];
            let notAtk1 = null;
            for(var i = 0; i < board.board.territories.length; i++) {
                if (posAtk1.indexOf(i) === -1) {
                    notAtk1 = i;
                    break;
                }
            }
            assert.isTrue(board.verifyFortify(0,posAtk1[0]));
            assert.isFalse(board.verifyFortify(0,notAtk1));
        });
    });
    describe('#getContinentFromTerritory(territory)', function() {
        it('returns the id of the continent the territory is in', function() {
            let board = new Board('default');
            assert.equal(board.getContinentFromTerritory(0), 0);
            assert.notEqual(board.getContinentFromTerritory(5),0);
        });
    });
    describe('#getTerritoriesOfContinent(continent)', function() {
        it('returns a list of the territories in the given continent', function() {
            let board = new Board('default');
            assert.isTrue(board.getTerritoriesOfContinent(0).indexOf(0) !== -1);
            assert.isFalse(board.getTerritoriesOfContinent(1).indexOf(0) !== -1);
        });
    });
    describe('#containsAllTerritories(terr,cont)', function() {
        it('returns a boolean if the terr Array contains all of the continent\'s territory array ', function() {
            let board = new Board('default');
            assert.isTrue(board.containsAllTerritories([0,1,2,3], 0));
            assert.isFalse(board.containsAllTerritories([0,1,2,3], 1));
        });
    });
    describe('#territory(id)', function() {
        it('returns the information on the given territory ID', function() {
            let board = new Board('default');
            assert.isTrue(board.territory(0) == board.board.territories[0]);
        });
    });
    describe('#continent(id)', function() {
        it('returns the information on the given continent ID', function() {
            let board = new Board('default');
            assert.isTrue(board.continent(0) == board.board.continents[0]);
        });
    });
    describe('#attackTerritories(from)', function() {
        it('returns the attackable territories on the given territory ID', function() {
            let board = new Board('default');
            assert.isTrue(board.attackTerritories(0) == board.board.territories[0]['attack']);
        });
    });
    describe('#fortifyTerritories(from)', function() {
        it('returns the attackable territories on the given territory ID', function() {
            let board = new Board('default');
            assert.isTrue(board.fortifyTerritories(0) == board.board.territories[0]['fortify']);
        });
    });
});
