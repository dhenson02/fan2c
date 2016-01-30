'use strict';
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const findWhere = require('lodash.findwhere');
const filePath = path.join(__dirname, '..', '/data/players.json');

class Players {
    constructor () {
        this.players = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" })).player;
    }

    getPlayer ( id ) {
        return findWhere(this.players, { id: id });
    }
}

module.exports = Players;
