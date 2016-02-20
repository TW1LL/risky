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
    describe('#addPlayer(user)',function() {
        let User = require('../app/user.js').User;
        let game = new Game('default', 4);
        let Server = require('mock-socket.io').Server;
        let io = new Server();
        let Client = require('mock-socket.io').Client;
        let ioC = new Client(io);
        io.on('connection', function(socket) {
            let usr = new User(socket);
            usr.setGameId(game.id, game.addPlayer(usr));
            it('adds player to game', function() {
                assert.equal(game.players[0].id,usr.id);
            });
            it('returns the players game_id', function() {
                assert.equal(0, usr.getGameId(game.id));
            });
        });
    });
    describe('#removePlayer(id)',function() {
        let User = require('../app/user.js').User;
        let game = new Game('default', 4);
        let Server = require('mock-socket.io').Server;
        let io = new Server();
        let Client = require('mock-socket.io').Client;
        let ioC = new Client(io);
        let ioc2 = new Client(io);
        io.on('connection', function(socket) {
            let usr = new User(socket);
            usr.setGameId(game, game.addPlayer(usr));
        });
        game.removePlayer(0);
        it('makes the index of the player equal to undefined', function() {
            assert.equal(undefined, game.players[0]);
        });
        it('keeps other player positions intact', function() {
            assert.notEqual(undefined, game.players[1]);
        });
    });
    describe('#updatePlayer(user)', function() {
        let User = require('../app/user.js').User;
        let game = new Game('default', 4);
        let Server = require('mock-socket.io').Server;
        let io = new Server();
        let users = {};
        io.on('connection', function(socket) {
            socket.on('identify user', function(data) {
                console.log(data);
                if (data == null || users[data] == undefined) {
                    data = socket.id;
                    users[data] = new User(socket);
                } else {
                    users[data].socket = socket;
                }
                socket.emit('userData', users[data].userData);
                users[data].setGameId(game, game.addPlayer(users[data]));
            });
        });
        let Client = require('mock-socket.io').Client;
        let ioC = new Client(io);
        let userid = null;
        ioC.on('connect', function(){
            console.log('user 1 connect');
            ioC.emit('identify user', userid);
        });
        ioC.on('userData', function(data){
            console.log('user 1 get userid');
            userid = data.id;
        });
        let ioc2 = new Client(io);
        ioc2.on('connect', function(){
            console.log('user 2 connect');
            ioC = null;
            ioc2.emit('identify user', userid);
        });
        ioc2.on('userdata', function(data){
            console.log('user 2 get userid');
            it('ensures the userid stays the same even when we change user objects ', function() {
                assert.equal(data.id, userid);
            });
        });

    });
});
