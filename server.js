'use strict';
const express = require('express');
const bp = require('body-parser');
const Server = express();
const server = require('http').createServer(Server);

Server.use(bp.json());
Server.use(bp.urlencoded({ extended: true }));
Server.use(express.static('dist'));

const Players = require('./server/build-player-info');
const Results = require('./server/build-weekly-results');
const Rosters = require('./server/build-rosters');
const League = require('./server/build-league');

const players = new Players();
const rosters = new Rosters(players);
const results = new Results(players);
const league = new League();

/*
Server.use('/players/:id', ( req, res ) => {
    res.json(players.getPlayer(req.params.id));
});

Server.use('/rosters/:id', ( req, res ) => {
    res.json(rosters.getRoster(req.params.id));
});

Server.use('/league/franchises/:id', ( req, res ) => {
    res.json(league.getFranchise(req.params.id));
});

Server.use('/league', ( req, res ) => {
    res.json(league.getSettings());
});*/

const io = require('socket.io')(server);

io.on('connection', function ( socket ) {
    console.log(`socket.io got a connection from: `, socket.id);

    let timer = null;
    socket.on("load league settings", () => {
        socket.emit("league settings loaded", league.getSettings());
    });

    socket.on("load franchise", id => {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(() => {
            socket.emit("franchise loaded", league.getFranchise(id), id);
        }, 750);
    });

    socket.on("load player injury", id => {
        let injury = players.getInjury(id);
        socket.emit("player injury loaded", injury, id);
    });

    socket.on("load roster", id => {
            socket.emit("roster loaded", rosters.getRoster(id), id);

    });

    socket.on("load starting lineup", ( id, withScores ) => {
        let lineup = withScores ?
                      results.getLineupWithScores(id) :
                      results.getLineup(id);
        socket.emit("starting lineup loaded", lineup, id);
    });

    socket.on("disconnect", () => console.log("D/C'd dang"));
});

server.listen(3003, () => console.log("Server listening on port 3003"));
