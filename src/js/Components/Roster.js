'use strict';

import React from 'react';
const socket = require('socket.io-client/socket.io')();

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: props.id,
            players: []
        };
        socket.on("roster loaded", roster => this.rosterLoaded(roster));
        socket.emit("load roster", props.id);
    }

    rosterLoaded ( roster ) {
        this.setState({
            players: roster
        });
    }

    render () {
        let playerList = this.state.players.map(player => {
            return <li key={player.id}>{player.name}</li>;
        });
        return (
            <div className="container">
                <h1 className="title">Roster</h1>
                <ul>
                    {playerList}
                </ul>
            </div>
        );
    }
}

export default Roster;
