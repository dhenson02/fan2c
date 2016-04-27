'use strict';

import React from 'react';

class PlayerItem extends React.Component {
    constructor ( props ) {
        super(props);
        let { id, name, position, team } = props.player;
        this.state = {
            player: {
                id,
                name,
                position,
                team
            }
        };
    }

    render () {
        return (
            <tr key={this.state.player.id}>
                <td data-label="Name">
                    {this.state.player.name}
                </td>
                <td data-label="Position">
                    {this.state.player.position}
                </td>
                <td data-label="Team">
                    {this.state.player.team}
                </td>
            </tr>
        );
    }
}

export default PlayerItem;
