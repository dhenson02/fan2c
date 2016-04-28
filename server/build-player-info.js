'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const config = require('../config.json');

class Players {
    constructor () {
        this.scores = new Map();
        this.injuries = new Map();
        this.players = new Map();
        this.setupInjuries();
        this.setupPlayers();
    }

    setupScores ( players, rosterID ) {
        let playerList = players.map(player => player.id);
        let url = `${config.url}${config.year}/export?TYPE=playerScores&W=YTD&L=${config.league}&JSON=1&PLAYERS=${playerList.join(',')}`;
        request(url, ( error, response, data ) => {
            if ( error ) {
                return console.error(error);
            }
            if ( response.statusCode === 200 ) {
                let scoreFilePath = path.join(__dirname, '..', `/data/playerScores-${rosterID}.json`);
                if ( typeof data === 'string' ) {
                    fs.writeFile(scoreFilePath, data, { encoding: 'utf8' }, function () {});
                    data = JSON.parse(data);
                }
                else {
                    fs.writeFile(scoreFilePath, JSON.stringify(data), { encoding: 'utf8' }, function () {});
                }
                let scores = data.playerScores.playerScore;
                scores.forEach(score => this.scores.set(score.id, score));
            }
            else {
                console.error(`Something went wrong.  Response: `, response);
            }
        });
    }

    setupInjuries () {
        let injuryFilePath = path.join(__dirname, '..', '/data/injuries.json');
        let injuryFile = fs.readFileSync(injuryFilePath, { encoding: "utf8" });
        let injuries = JSON.parse(injuryFile).injury;
        injuries.forEach(injury => {
            this.injuries.set(injury.id, injury);
        });
    }

    setupPlayers () {
        let playersFilePath = path.join(__dirname, '..', '/data/players.json');
        let playersFile = fs.readFileSync(playersFilePath, { encoding: "utf8" });
        let players = JSON.parse(playersFile).player;
        players.forEach(player => {
            let injury = this.injuries.get(player.id);
            // FOR NOW!!!
            let score = this.scores.get(player.id) || Math.floor(Math.random() * 100);
            let fullPlayer = Object.assign({ injury, score }, player);
            this.players.set(player.id, fullPlayer);
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
