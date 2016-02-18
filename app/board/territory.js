"use strict"

class Territory {
    constructor(board, id) {
        this.board = board;
        this.id = id;
        this.name = board.territory(id)['name'];
        this.continent = board.getContinentFromTerritory(id);
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

    attack(territory, units, count) {
        if(this.board.verifyAttack(this.id, territory.id)) {
            if(territory.units == 0 || this.units == 1) {
                return false;
            }
            let results = [];
            while(count > 0) {
                if(territory.units == 0 || this.units == 1) {
                    break;
                }
                let attack = this.rollAttack(units);
                let defend = territory.rollDefend();
                let num = (attack.length > 1) ? defend.length - 1 : 1;
                for(var i = 0; i <= num; i++) {
                    if (attack[i] > defend[i]) {
                        territory.loseUnit(1);
                    } else {
                        this.loseUnit(1);
                    }
                    results.push([attack[i],defend[i]]);
                }
                if(attack.length == 3) {
                    results.push([attack[2]]);
                }
                count--;
            }
            return results;
        } else {
            return false;
        }
    }

    rollAttack(units) {
        let rtn = [];
        if(units > 2) {
            rtn =  [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        } else if (units > 1) {
            rtn = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        } else {
            rtn = [Math.floor(Math.random() * 6) + 1];
        }
        rtn.sort((a,b) => b - a);
        return rtn;
    }
    rollDefend() {
        let rtn = [];
        if(this.units > 1) {
            rtn =  [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        } else {
            rtn = [Math.floor(Math.random() * 6) + 1];
        }
        rtn.sort((a,b) => b - a);
        return rtn;
    }


    fortify(territory, units) {

    }

    loseUnit(count) {
        this.units -= count;
    }

}

exports.Territory = Territory;
