"use strict"

class Territory {
    constructor(name, continent) {
        this.name = name;
        this.continent = continent;
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
