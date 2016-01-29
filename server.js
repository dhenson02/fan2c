'use strict';
const express = require('express');
const bp = require('body-parser');
const Server = express();
Server.use(bp.json());
Server.use(bp.urlencoded({ extended: true }));
Server.use(express.static('dist'));

const Players = require('./server/build-player-info');
const Rosters = require('./server/build-rosters');
let players = new Players();
let rosters = new Rosters(players);

Server.use('/players/:id', ( req, res ) => {
    res.json(players.getPlayer(req.params.id));
});

Server.use('/rosters/:id', ( req, res ) => {
    res.json(rosters.getRoster(req.params.id));
});

Server.listen(3003, () => console.log("Server listening on port 3003"));
