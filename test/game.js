"use strict"
let assert = require("chai").assert;
describe("Game", function() {
    let Game = require('../app/game.js').Game;
    describe('#constructor()', function() {
        it('should create a board object and setup numPlayers', function() {
            let game = new Game('default', 4);
            assert.equal(game.numPlayers, 4);
            assert.isArray(game.board.territories);
            assert.equal(game.territories[0].name, game.board.territories[0].name);
        });
    });
    describe('#attack(user, from, to, units, count)', function() {
        let game = new Game('default', 4);
        game.territories[0].gainUnit(4);
        game.territories[1].gainUnit(2);
        it('returns false if user does not own `from`', function() {
            game.territories[0].owner = 1;
            let attack = game.attack(0,0,1,2,1);
            assert.isFalse(attack);
        });
        it('returns result of a successful attack', function() {
            game.territories[0].owner = 0;
            let attack = game.attack(0,0,1,2,1);
            assert.isArray(attack);
        });
    });
    describe('#attack(user, from, to, units, count)', function() {
        let game = new Game('default', 4);
        game.territories[0].gainUnit(4);
        game.territories[1].gainUnit(2);
        it('returns false if user does not own `from`', function() {
            game.territories[0].owner = 0;
            game.territories[1].owner = 1;
            let fortify = game.fortify(0,0,1,2);
            assert.isFalse(fortify);
        });
        it('returns result of a successful fortification', function() {
            game.territories[0].owner = 0;
            game.territories[1].owner = 0;
            let fortify = game.fortify(0,0,1,2);
            assert.isTrue(fortify);
        });
    });
});
