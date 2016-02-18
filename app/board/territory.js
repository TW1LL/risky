"use strict"

class Territory {
    constructor(boardData, continent) {
        this.name = boardData.name;
        this.continent = boardData;
        this.units = 0;
    }
    get owner() {
        return this.user;
    }

    set owner(owner) {
        if (owner) {
            this.user = owner;
        }
    }

    attack(territory,units,count) {

    }

    defend() {

    }

    fortify(territory, units) {

    }

}

exports.Territory = Territory;
