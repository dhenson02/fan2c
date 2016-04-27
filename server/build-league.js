'use strict';
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', '/data/league.json');

class League {
    constructor () {
        this.league = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));
        this.franchises = this.league.franchises.franchise;
    }

    /*_getFranchise ( id ) {
        return (
            this.Franchises
                .get('franchise')
                .find(id, 'id')
                .get('player')
                .toJS()
        );
    }*/

    getSettings () {
        return this.league;
    }
}

module.exports = League;
