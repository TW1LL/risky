"use strict"

let uuid = require('node-uuid');
let Board = require('../app/board/board').Board;
let Territory = require('../app/board/territory').Territory;

class Game {
    constructor(map, numPlayers) {
        this.id = uuid.v1();
        this.board = new Board(map);
        this.numPlayers = numPlayers;
        this.players = [];
        this.territories = [];
        for (var i = 0; i < this.board.territories.length; i++) {
            this.territories[i] = new Territory(this.board, i);
        }
    }
    setupBoard() {

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
    addPlayer(user) {
        this.players.push(user);
        user.gameId = this.players.length - 1;
        if(this.players.length == this.numPlayers) {
            this.setupBoard();
        }
        return user.gameId;
    }
    removePlayer(id) {
        this.players[id] = undefined;
    }
    updatePlayer(user) {
        this.players[user.gameId] = user;
    }
}

exports.Game = Game;
