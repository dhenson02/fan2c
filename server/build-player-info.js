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

    _loadPlayers () {
        fs.readFile(filePath, { encoding: "utf8" }, ( err, data ) => {
            let players = new Map(JSON.parse(data));
            this.players = new Immutable.List(players.get('player'));
        });
    }

    loadPlayers () {
    }

    _getPlayer ( id ) {
        return (
            this.players
                .getIn({ id: id })
        );
    }

    getPlayer ( id ) {
        return findWhere(this.players, { id: id });
    }
}

module.exports = Players;
