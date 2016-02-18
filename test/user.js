"use strict"
let assert = require('chai').assert;
describe('User', function() {
    let User = require('../app/user').User;
        describe('#constructor()', function() {
            it('will give a User.type based on construction parameters', function() {
                let usr = new User();
                assert.equal('rest', usr.type);
            });

            describe('socket', function() {
                it('when User.type == socket, User.socket must be a valid socket.io object', function() {
                    let usr = new User({id: 'random'});
                    assert.isFalse(usr.socket.hasOwnProperty('nsp'));
                    assert.isFalse(usr.socket.hasOwnProperty('connected'));
                    let Server = require('mock-socket.io').Server;
                    let io = new Server();
                    let Client = require('mock-socket.io').Client;
                    let ioC = new Client();
                    io.on('connection', function(socket) {
                        usr = new User(socket);
                        assert.isTrue(usr.socket.hasOwnProperty('nsp'));
                        assert.isTrue(usr.socket.hasOwnProperty('connected'));
                        assert.isTrue(usr.socket.connected == true);
                        assert.isTrue(usr.socket.id == "/#"+ ioC.id);
                    });
                });
            });
        });

        describe('nickname', function() {
            it('will either set or get the current nickname of the user', function() {
                let usr = new User();
                assert.equal(undefined, usr.nickname);
                usr.nickname = "Mr. Test";
                assert.equal("Mr. Test", usr.nickname);
            });

        });
});
