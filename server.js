"use strict"
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let User = require('./app/user').User;
let users = {};
let games = {};
io.on('connection', function(socket) {

    socket.on('identify user', function(data) {
        console.log(users[data]);
        if (data == null || users[data] == undefined) {
            data = socket.id;
            users[data] = new User(socket);
        } else {
            users[data].socket = socket;
        }
        socket.emit('userData', users[data].userData);
    });
});

app.use('/', express.static('public'));

function run(port) {
    port = port || 3000;
    http.listen(port, function () {
      console.log('Example app listening on port 3000!');
    });
}

run();

exports.users = users;
exports.run = run;
exports.io = io;
exports.games = games;
