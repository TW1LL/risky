"use strict"
let fs = require("fs");
class Board {
    constructor(name) {
        this.map = this.importMap(name);
    }

    importMap(name) {
        let file = fs.readFileSync('./resources/maps/'+name+'.json', 'utf8');
        file = file.replace (/"(\d+(\.\d+)?)"/g, "$1");
        return JSON.parse(file);
    }

    verifyAttack(from, to) {
        return this.map.territories[from]['attack'].indexOf(to) !== -1;
    }
    verifyFortify(from, to) {
        return this.map.territories[from]['fortify'].indexOf(to) !== -1;
    }

    getContinent(territory) {
        for(var i = 0; i <= this.map.continents.length; i++) {
            if(this.map.continents[i]['territories'].indexOf(territory) !== -1) {
                return i;
            }
        }
        return null;
    }

    getTerritories(continent) {
        return this.map.continents[continent]['territories'];
    }

    containsAllTerritories(territories, continent) {
            return territories.sort().toString() == this.map.continents[continent]['territories'].sort().toString();
    }




}



exports.Board = Board;
