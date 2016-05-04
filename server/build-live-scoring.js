'use strict';
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.rosters = new Map();
        this.players = players;
        let rosters = JSON.parse(file).franchise;
        rosters.forEach(roster => {
            this.players.setupScores(roster.player, roster.id);
            this.rosters.set(roster.id, roster.player);
        });
    }

    getRoster ( id ) {
        let roster = this.rosters.get(id);
        let fullRoster = roster.map(player => {
            return this.players.getPlayer(player.id);
        });
        let sortedRoster = fullRoster;

        return sortedRoster;
    }
}

module.exports = Rosters;
