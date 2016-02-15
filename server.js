"use strict"
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let user = require('./app/user');
let users = {};


let tfitz237 = new user.User({id:'1234'});

io.on('connection', function(socket) {
    users[socket.id] = new user.User(socket);
    console.log(users);
});
app.use('/', express.static('public'));








http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
