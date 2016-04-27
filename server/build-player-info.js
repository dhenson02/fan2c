'use strict';
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const findWhere = require('lodash.findwhere');
const filePath = path.join(__dirname, '..', '/data/players.json');

class Players {
    constructor () {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.players = JSON.parse(file).player;
    }

    getPlayer ( id ) {
        let player = findWhere(this.players, { id: id });
        player.name = player.name.replace(/^(\w+), (\w+)/, "$2 $1");
        return player;
    }
}

module.exports = Players;
