"use strict"
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let User = require('./app/user').User;
let connection = require('./app/events').connection;
let server = null;
class Server {
    constructor(port) {
        this.userList = {};
        this.gameList = {};
    }
    run(port) {
        this.port = (typeof port == "undefined") ? 3000 : this.port;
        http.listen(this.port, function () {
          console.log('Risk socket/REST server running on port ' + this.port);
        });
    }
    get users() {
        return this.userList;
    }
    set users(users) {
        this.userList = users;
    }
    getUser(id) {
        return this.userList[id];
    }
    updateUser(id, user) {
        this.userList[id] = user;
    }
    get games() {
        return this.gameList;
    }
    set games(game) {
        this.gameList = game;
    }
    updateGames(id, game) {
        this.gameList[id] = game;
    }
}
server = new Server();
io.on('connection', connection);

app.use('/', express.static('public'));


if(process.argv[2] !== undefined) {
    let args = process.argv[2];
    eval(process.argv[2] + "();");
}

function run(port) {
    server.run(port);
}

exports.server = server;
