"use strict"
require('node-monkey').start({ port:"5000"});
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let User = require('./app/user').User;
let users = {};

io.on('connection', function(socket) {
    users[socket.id] = new User(socket);
    console.log(users);
});



app.use('/', express.static('public'));


http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
