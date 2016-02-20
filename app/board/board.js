"use strict"
let fs = require("fs");
let mapData = Symbol('mapdata');
class Board {
    constructor(name) {
        this[mapData] = this.importMap(name);
        this.territories = this[mapData].territories;
        this.continents = this[mapData].continents;
    }

    get board() {
        return this[mapData]; // for tests
    }
    territory(id) {
        return this[mapData].territories[id];
    }
    continent(id) {
        return this[mapData].continents[id];
    }
    importMap(name) {
        let file = fs.readFileSync('./resources/maps/'+name+'.json', 'utf8');
        file = file.replace (/"(\d+(\.\d+)?)"/g, "$1");
        return JSON.parse(file);
    }
    verifyAttack(from, to) {
        return this[mapData].territories[from]['attack'].indexOf(to) !== -1;
    }
    verifyFortify(from, to) {
        return this[mapData].territories[from]['fortify'].indexOf(to) !== -1;
    }
    getContinentFromTerritory(territory) {
        for(var i = 0; i <= this[mapData].continents.length; i++) {
            if(this[mapData].continents[i]['territories'].indexOf(territory) !== -1) {
                return i;
            }
        }
        return null;
    }
    getTerritoriesOfContinent(continent) {
        return this[mapData].continents[continent]['territories'];
    }
    attackTerritories(from) {
        return this[mapData].territories[from]['attack'];
    }
    fortifyTerritories(from) {
        return this[mapData].territories[from]['fortify'];
    }
    containsAllTerritories(territories, continent) {
            return territories.sort().toString() == this[mapData].continents[continent]['territories'].sort().toString();
    }
}

exports.Board = Board;
