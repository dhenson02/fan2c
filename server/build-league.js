'use strict';
const fs = require('fs');
const path = require('path');
//const Immutable = require('immutable');
const findWhere = require('lodash.findwhere');
const filePath = path.join(__dirname, '..', '/data/league.json');

class League {
    constructor ( rosters ) {
        this.rosters = rosters;
        this.league = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));
        this.franchises = this.league.franchises.franchise;
    }

    _getFranchise ( id ) {
        return (
            this.Franchises
                .get('franchise')
                .find(id, 'id')
                .get('player')
                .toJS()
        );
    }

    getFranchise ( id ) {
        //let franchise = findWhere(this.franchises, { id: id });
        return findWhere(this.franchises, { id: id });
        /*return franchise.map(( player ) => {
            return Object.assign({}, player, this.players.getPlayer(player.id));
        });*/
    }

    getSettings () {
        return this.league;
    }
}

module.exports = League;
