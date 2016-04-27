'use strict';

import React from 'react';
import PlayerItem from './PlayerItem';

class PlayerList extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.withScores !== this.props.withScores ||
            nextProps.players !== this.props.players;
    }

    render () {
        let playerList = this.props.players.map(( player, i ) => {
            if ( this.props.withScores === true && player.status === 'nonstarter' ) {
                return;
            }
            return (
                <PlayerItem key={i}
                            player={player}
                            withScores={this.props.withScores}/>
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
