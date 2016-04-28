'use strict';

import React from 'react';
import PlayerItem from './PlayerItem';

class PlayerList extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.showStarters !== this.props.showStarters ||
            nextProps.players !== this.props.players;
    }

    render () {
        let playerList = this.props.players.map(( player, i ) => {
            if ( this.props.showStarters === true && player.status === 'nonstarter' ) {
                return;
            }
            return (
                <PlayerItem key={i}
                            player={player}
                            showStarters={this.props.showStarters}/>
            );
        });
        return (
            <tbody>
                {playerList}
            </tbody>
        );
    }
}

export default PlayerList;
