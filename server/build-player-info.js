'use strict';
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const filePath = path.join(__dirname, '..', '/data/players.json');
const injuryFilePath = path.join(__dirname, '..', '/data/injuries.json');

class Players {
    constructor () {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let injuryFile = fs.readFileSync(injuryFilePath, { encoding: "utf8" });
        this.players = new Map();
        this.injuries = new Map();
        let players = JSON.parse(file).player;
        let injuries = JSON.parse(injuryFile).injury;
        players.forEach(player => {
            this.players.set(player.id, player);
        });
        injuries.forEach(injury => {
            this.injuries.set(injury.id, injury);
        });
    }

    getInjury ( id ) {
        return this.injuries.get(id);
    }

    getPlayer ( id ) {
        return this.players.get(id);
    }
}

module.exports = Players;
