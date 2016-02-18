"use strict"

class Territory {
    constructor(board, id) {
        this.board = board;
        this.id = id;
        this.name = board.territory(id)['name'];
        this.continent = board.getContinentFromTerritory(id);
        this.units = 0;
        this.user = null;
    }
    get owner() {
        return this.user;
    }
    set owner(owner) {
            this.user = owner;
    }
    attack(territory, units, count) {
        if(this.board.verifyAttack(this.id, territory.id)) {
            if(!this.verifyAttack(territory)) {
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
        }
        return false;
    }
    rollAttack(units) {
        let rtn = [];
        if (units >= this.units) {
            units = this.units - 1;
        }
        for (var i = 1; (i <= units); i++) {
            rtn.push(Math.floor(Math.random() * 6) + 1);
        }
        rtn.sort((a,b) => b - a);
        return rtn;
    }
    rollDefend() {
        let rtn = [];
        for (var i = 1; i <= this.units; i++) {
            rtn.push(Math.floor(Math.random() * 6) + 1);
        }
        rtn.sort((a,b) => b - a);
        return rtn;
    }
    verifyAttack(territory) {
        return (territory.units != 0 && this.units > 1);
    }
    fortify(territory, units) {
        if (this.board.verifyFortify(this.id, territory.id)) {
            if (this.verifyFortify(territory, units)) {
                this.loseUnit(units);
                territory.gainUnit(units);
                return true;
            }
        }
        return false;
    }
    verifyFortify(territory, units) {
        return (units < this.units && this.verifyOwner(territory.owner));
    }
    loseUnit(count) {
        this.units -= count;
    }
    gainUnit(count) {
        this.units += count;
    }
    verifyOwner(user) {
        return user == this.owner;
    }
}

exports.Territory = Territory;
