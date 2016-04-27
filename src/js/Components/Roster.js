'use strict';

import React from 'react';
import PlayerItem from './Player/PlayerItem';
import sortBy from 'lodash.sortby';
const socket = require('socket.io-client/socket.io')();

class PlayerList extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            playerList: {
                QB: [],
                RB: [],
                WR: [],
                TE: [],
                Def: [],
                PK: []
            }
        };
    }

    setupList ( players ) {
        let total = players.length;
        let playerList = {
            QB: [],
            RB: [],
            WR: [],
            TE: [],
            Def: [],
            PK: []
        };
        for ( let i = 0; i < total; ++i ) {
            let player = players[ i ];
            playerList[ player.position ][ i ] = <PlayerItem key={i} player={player}/>;
        }
        this.setState({
            playerList
        });
    }

    componentWillMount () {
        this.setupList(this.props.players);
    }

    componentWillReceiveProps ( nextProps ) {
        this.setupList(nextProps.players);
    }

    render () {
        let playerList = this.state.playerList;
        return (
            <tbody>
                {playerList.QB}
                {playerList.RB}
                {playerList.WR}
                {playerList.TE}
                {playerList.Def}
                {playerList.PK}
            </tbody>
        );
    }
}

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            players: [],
            _players: [],
            currentSorting: 'position'
        };
        this.sortFunctions = {
            positions: {
                QB: 6,
                RB: 5,
                WR: 4,
                TE: 3,
                Def: 2,
                PK: 1
            },
            nameSort ( name ) {
                let names = name.split(/\s/);
                return `${names.slice(-1)}${names.slice(0,-1)}`;
            },
            positionSort ( first, second ) {
                let a = this.positions[ first ];
                let b = this.positions[ second ];
                if ( a > b ) {
                    return 1;
                }
                if ( a < b ) {
                    return -1;
                }
                return 0;
            }
        }
        socket.on("roster loaded", players => this.rosterLoaded(players));
        socket.emit("load roster", props.id);
    }

    handlePlayerSort ( field ) {
        let players = this.state._players.slice(0);
        let self = this;
        let sorter = {
            name () {
                return sortBy(players, player => {
                    let value = player.name;
                    return self.sortFunctions.nameSort(value);
                });
            },
            position () {
                return players.sort(( a, b ) => {
                    return self.sortFunctions.positionSort(a.position, b.position);
                });
            },
            team () {
                return sortBy(players, 'team');
            }
        }
        this.setState({
            players: sorter[ field ]()
        });
    }

    rosterLoaded ( players ) {
        this.setState({
            players,
            _players: players
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.id !== this.props.id ||
            nextState.players !== this.state.players;
    }

    render () {
        let playerList = this.state.players.length !== 0 ?
                         <PlayerList players={this.state.players}/> :
                         null;
        return (
            <table className="table-responsive table-bordered table-stripped">
                <thead>
                    <tr>
                        <th onClick={e => this.handlePlayerSort('name')}>Name</th>
                        <th onClick={e => this.handlePlayerSort('position')}>Position</th>
                        <th onClick={e => this.handlePlayerSort('team')}>Team</th>
                    </tr>
                </thead>
                {playerList}
            </table>
        );
    }
}

export default Roster;
