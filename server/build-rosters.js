'use strict';
const fs = require('fs');
const path = require('path');
// const Immutable = require('immutable');
const findWhere = require('lodash.findwhere');
const sortBy = require('lodash.sortby');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.players = players;
        this.rosters = JSON.parse(file).franchise;
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
        let fullRoster = roster.map(player => {
            return this.players.getPlayer(player.id);
        });
        let sortedRoster = sortBy(fullRoster, player => {
            return player.name.split(/\s/).slice(-1);
        });
        return sortedRoster;
    }
}

module.exports = Rosters;
