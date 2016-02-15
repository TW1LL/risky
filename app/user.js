"use strict"


class User {
    constructor(socket) {
        this.id = socket.id;
        this.socket = socket;
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
