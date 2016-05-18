'use strict';

import React from 'react';
import PlayerItem from './PlayerItem';
import connect from '../../Utility/connect';

class PlayerList extends React.Component {
    constructor ( props ) {
        super(props);
    }

    componentWillUpdate () {
        let players = this.props.franchise.get('player');
        let week = this.props.params.week || 13;
        let url = `TYPE=lineup&W=${week}&STARTERS=${players.join(',')}`;
        connect(url, status => {
            this.props.isLoading(false);
            if ( status === 'success' ) {
                this.props.loadLineup('LINEUP_CHANGE_SUCCESS', {
                    players,
                    week
                });
            }
            else {
                this.props.loadLineup('LINEUP_CHANGE_FAILURE', null);
            }
        });
    }

    /*shouldComponentUpdate ( nextProps ) {
        return nextProps.players !== this.props.players;
    }*/

    render () {
        let playerList = this.props.roster.map(( player, i ) => {
            return <PlayerItem key={i} player={player}/>;
        });
        return (
            <tbody>
                {playerList}
            </tbody>
        );
    }
}

export default PlayerList;
