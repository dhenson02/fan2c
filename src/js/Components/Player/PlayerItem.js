'use strict';

import React from 'react';
const socket = require('socket.io-client/socket.io')();

class PlayerItem extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            injury: null
        };
        this.rowClasses = {
            QB: 'success',
            RB: 'primary',
            WR: 'warning',
            TE: 'info',
            Def: 'danger',
            PK: 'active'
        }
        socket.on("player injury loaded", ( injury, id ) => {
            if ( id !== this.props.player.id ) {
                return;
            }
            if ( injury === undefined ) {
                this.loadingInjury = false;
                return;
            }
            this.setState({
                injury
            });
            this.loadingInjury = false;
        });
        this.loadingInjury = false;
    }

    handleShowInjury () {
        if ( this.loadingInjury === true || this.state.injury !== null ) {
            return
        }
        this.loadingInjury = true;
        socket.emit("load player injury", this.props.player.id);
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.withScores !== this.props.withScores ||
                nextState.injury !== this.state.injury ||
            nextProps.player.id !== this.props.player.id ||
            nextProps.player.status !== this.props.player.status ||
            nextProps.player.score !== this.props.player.score;
    }

    render () {
        const regName = /^(\w+), (\w+)/;
        let player = this.props.player;

        let name = player.name.replace(regName, "$2 $1");
        let nameElement = player.status === 'starter' ?
                          <strong>{name}</strong> :
                          name;

        let scoreColumn = null;
        let score = null;
        if ( this.props.withScores === true ) {
            score = player.score;
            scoreColumn = (
                <td data-label="Score">
                    {score}
                </td>
            );
        }
        let injury = this.state.injury ?
                     `${this.state.injury.status} - ${this.state.injury.details}` :
                     null;
        return (
            <tr title={injury || `Player ID: ${player.id}`}
                onMouseOver={() => this.handleShowInjury()}
                className={`roster-row ${this.rowClasses[ player.position ]}`}
                data-toggle="tooltip"
                data-placement="bottom"
                data-original-title={injury || `Player ID: ${player.id}`}>
                <td data-label="ID">
                    {player.id}
                </td>
                {scoreColumn}
                <td data-label="Name">
                    {nameElement}
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
