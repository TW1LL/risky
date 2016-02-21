"use strict"
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let User = require('./app/user').User;
app.use('/', express.static('public'));
class Server{
    constructor(port) {
        this.userList = {};
        this.gameList = {};
        this.port = 3000;
    }
    run(port) {
        this.port = (port) ? port : 3000;
        http.listen(this.port, () => console.log('Risk socket/REST server running on port ' + this.port));
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
module.exports = new Server();
io.on('connection', events);




if(process.argv[2] !== undefined) {
    let args = process.argv[2];
    eval("module.exports." + process.argv[2] + "();");
}



function events(socket) {
        socket.on('user:identify', function(userId) {
            if (userId == null || module.exports.users[userId] == undefined) {
                userId = socket.id;
                module.exports.updateUser(userId, new User(socket));
            } else {
                let user = module.exports.getUser(userId);
                user.socket = socket;
                module.exports.updateUser(userId, user);
            }
            socket.emit('user:data', module.exports.users[userId].data);
        });

        socket.on('list:games', function(userId) {
            socket.emit('list:games', module.exports.users[userId].currentGames);
        });

        socket.on('list:users', function() {
            let listusers = [];
            for(var i = 0; i < users.length; i ++) {
                listusers = module.exports.users[i].data;
            }
            socket.emit('list:games', listusers);
        });

        socket.on('game:data', function() {});


}
