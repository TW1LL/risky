"use strict"
class User {
    constructor(socket) {
        if (socket !== undefined) {
            this.type = 'socket';
            this.id = socket.id;
            this.socketio = socket;
            this.games = [];
            this.game_id = {};
        } else {
            this.type = 'rest';
        }
    }
    get nickname() {
        return this.nick;
    }
    set nickname(nick) {
        this.nick = nick;
    }
    get socket() {
        return this.socketio;
    }
    set socket(sock) {
        this.socketio = sock;
        let games = require('../server').games;
        let current = this.currentGames;
        for(var i = 0; i < current.length; i++) {
            games[current[i]].updatePlayer(this);
        }
    }
    getGameId(game) {
        return this.game_id[game];
    }
    setGameId(game, id) {
        this.game_id[game] = id;
    }
    get currentGames() {
        if (this.games.length == 0) {
            let games = require('../server').games;
            for (var i = 0; i < games.length; i++) {
                for (var game_id = 0; game_id < games[i].players.length; game_id++) {
                    if (games[i].players[game_id].id == this.id) {
                        this.games.push(games[i].id);
                        this.game_id[games[i].id] = game_id;
                    }
                }
            }
        }
        return this.games;
    }
    addGame(game, id) {
        this.games.push[games];
        this.games_id[game] = id;
    }

    get data() {
        return {
            type: this.type,
            nick: this.nick,
            id: this.id,
            games: this.games,
            game_id: this.game_id
        };
    }
}


exports.User = User;
