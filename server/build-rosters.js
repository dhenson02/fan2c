'use strict';
const fs = require('fs');
const path = require('path');
// const Immutable = require('immutable');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.rosters = new Map();
        this.players = players;
        let rosters = JSON.parse(file).franchise;
        rosters.forEach(roster => {
            this.rosters.set(roster.id, roster.player);
        });
        this.positions = {
            QB: 6,
            RB: 5,
            WR: 4,
            TE: 3,
            Def: 2,
            PK: 1
        };
        this.positionSort = ( first, second ) => {
            let a = this.positions[ first.position ];
            let b = this.positions[ second.position ];
            if ( a < b ) {
                return 1;
            }
            if ( a > b ) {
                return -1;
            }
            return 0;
        };

    }

    /*_getRoster ( id ) {
        return (
            this.Rosters
                .get('franchise')
                .find(id, 'id')
                .get('player')
                .toJS()
        );
    }*/

    getRoster ( id ) {
        let roster = this.rosters.get(id);
        let fullRoster = roster.map(player => {
            return this.players.getPlayer(player.id);
        });
        let sortedRoster = fullRoster.sort(this.positionSort);

        return sortedRoster;
    }
}

module.exports = Rosters;
