'use strict';

import React from 'react';
const socket = require('socket.io-client/socket.io')();

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
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
            return (
                <tr key={player.id}>
                    <td data-label="Name">
                        {player.name}
                    </td>
                    <td data-label="Position">
                        {player.position}
                    </td>
                    <td data-label="Team">
                        {player.team}
                    </td>
                </tr>
            );
        });
        return (
            <table className="table-responsive table-bordered table-stripped">
                <caption>Roster</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    {playerList}
                </tbody>
            </table>
        );
    }
}

export default Roster;
