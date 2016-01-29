'use strict';
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const findWhere = require('lodash.findwhere');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        this.players = players;
        this.rosters = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" })).franchise;
    }

    _getRoster ( id ) {
        return (
            this.Rosters
                .get('franchise')
                .find(id, 'id')
                .get('player')
                .toJS()
        );
    }

    getRoster ( id ) {
        let roster = findWhere(this.rosters, { id: id }).player;
        return roster.map(( player ) => {
            return Object.assign({}, player, this.players.getPlayer(player.id));
        });
    }
}

module.exports = Rosters;
