"use strict"
let User = require('./user').User;
let server = require('../server').server;
console.log(server);
function events(socket) {
        socket.on('user:identify', function(userId) {
            if (userId == null || server.users[userId] == undefined) {
                userId = socket.id;
                server.updateUser(userId, new User(socket));
            } else {
                let user = server.getUser(userId);
                user.socket = socket;
                server.updateUser(userId, user);
            }
            socket.emit('user:data', server.users[userId].data);
        });

        socket.on('list:games', function(userId) {
            socket.emit('list:games', server.users[userId].currentGames);
        });

        socket.on('list:users', function() {
            let listusers = [];
            for(var i = 0; i < users.length; i ++) {
                listusers = server.users[i].data;
            }
            socket.emit('list:games', listusers);
        });

        socket.on('game:data', function() {});


}


exports.connection = events;
