'use strict';

import React from 'react';

class PlayerItem extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.showStarters !== this.props.showStarters ||
            nextProps.player.id !== this.props.player.id ||
            nextProps.player.status !== this.props.player.status ||
            nextProps.player.score !== this.props.player.score;
    }

    render () {
        const regName = /^(\w+), (\w+)/;
        let player = this.props.player;

        let name = player.name.replace(regName, "$2 $1");
        let nameElement = player.status !== 'nonstarter' ?
                          <strong>{name}</strong> :
                          name;

        let scoreColumn = null;
        let score = null;
        if ( this.props.showStarters === true ) {
            score = parseInt(player.score, 10);
            scoreColumn = (
                <td data-label="Score">
                    {score}
                </td>
            );
        }
        let injury = player.injury ?
                     `${player.injury.status}, ${player.injury.details}` :
                     null;
        let rowClasses = {
            QB: 'success',
            RB: 'primary',
            WR: 'warning',
            TE: 'info',
            Def: 'danger',
            PK: 'active'
        };
        return (
            <tr title={`Player ID: ${player.id}`}
                className={`roster-row ${rowClasses[ player.position ]}`}
                data-toggle="tooltip"
                data-placement="bottom"
                data-original-title={`Player ID: ${player.id}`}>
                {scoreColumn}
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
