"use strict"

class User {
    constructor(socket) {
        if (socket) {
            this.type = 'socket';
            this.id = socket.id;
            this.socket = socket;
        } else {
            this.type = 'rest';
        }
    }
    get nickname() {
        return this.nick;
    }
    set nickname(nick) {
        if (nick) {
            this.nick = nick;
        }
    }


}


exports.User = User;
