"use strict"

let Board = require('../app/board/board').Board;
let Territory = require('../app/board/territory').Territory;

class Game {
    constructor(map, numPlayers) {
        this.board = new Board(map);
        this.numPlayers = numPlayers;
        this.players = [];
        this.setupBoard();
    }
    setupBoard() {
        this.territories = [];
        for (var i = 0; i < this.board.territories.length; i++) {
            this.territories[i] = new Territory(this.board, i);
        }
    }
    attack(user, from, to, units, count) {
        from = this.territories[from];
        to = this.territories[to];
        if (!from.verifyOwner(user)) {
            return false;
        }
        return from.attack(to, units, count);
    }
    fortify(user, from, to, units) {
        from = this.territories[from];
        to = this.territories[to];
        if (!from.verifyOwner(user)) {
            return false;
        }
        return from.fortify(to, units);
    }
}

exports.Game = Game;
