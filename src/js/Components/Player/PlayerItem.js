'use strict';

import React from 'react';
import socket from '../../Socket';

const regName = /^([A-Za-z\-]+), ([A-Za-z\-]+)( [A-Za-z\-]+)?/;
const rowClasses = {
    QB: 'success',
    RB: 'primary',
    WR: 'warning',
    TE: 'info',
    Def: 'danger',
    PK: 'active'
};

class PlayerItem extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            starter: false
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.starter !== this.state.starter ||
            nextProps.player.id !== this.props.player.id ||
            nextProps.player.status !== this.props.player.status ||
            nextProps.player.score !== this.props.player.score;
    }

    handleStarter ( e ) {
        e.preventDefault();
        let newStatus = !this.state.starter;
        socket.on('lineup changed', ( id, starter ) => {
            if ( id !== this.props.player.id ) {
                return;
            }
            this.setState({
                starter
            });
        });
        socket.emit('change lineup', this.props.player.id, newStatus);
    }

    render () {
        let player = this.props.player;
        let starterText = "START";
        let starterClass = "btn btn-sm btn-success";
        let name = player.name.replace(regName, "$2$3 $1");
        let nameElement = name;
        if ( this.state.starter === true ) {
            nameElement = <strong>{name}</strong>;
            starterText = "BENCH";
            starterClass = "btn btn-sm btn-default";
        }

        /*let score = player.score;
        let scoreColumn = (
            <td data-label="Score">
                {score}
            </td>
        );*/

        let injury = player.injury ?
                     `${player.injury.status}, ${player.injury.details}` :
                     null;
        return (
            <tr title={`Player ID: ${player.id}`}
                className={`roster-row ${rowClasses[ player.position ]}`}>
                <td data-label="Line-up">
                    <a href="#"
                       onClick={e => this.handleStarter(e)}
                       className={starterClass}>
                        {starterText}
                    </a>
                </td>
                <td data-label="Name">
                    {nameElement}
                </td>
                <td data-label="Injury">
                    {injury}
                </td>
                <td data-label="Position">
                    {player.position}
                </td>
                <td data-label="Team">
                    {player.team}
                </td>
            </tr>
        );
    }
}

export default PlayerItem;
