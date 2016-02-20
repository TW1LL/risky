"use strict"
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let User = require('./app/user').User;
let users = {};
let games = {};
io.on('connection', connection);

function connection(socket) {

        socket.on('identify user', function(data) {

            if (data == null || users[data] == undefined) {
                data = socket.id;
                users[data] = new User(socket);
            } else {
                users[data].socket = socket;
            }
            socket.emit('userData', users[data].userData);
            console.log(users[data]);
        });
}


app.use('/', express.static('public'));

function run(port) {
    port = port || 3000;
    http.listen(port, function () {
      console.log('Example app listening on port 3000!');
    });
}


exports.connection = connection;
exports.users = users;
exports.run = run;
exports.io = io;
exports.games = games;
