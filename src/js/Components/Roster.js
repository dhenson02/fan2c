'use strict';

import React from 'react';
import PlayerList from './Player/PlayerList';
import sortBy from 'lodash.sortby';
import findWhere from 'lodash.findwhere';
const socket = require('socket.io-client/socket.io')();

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
        this.isLoading = false;
        this.state = {
            players: [],
            _players: [],
            sorting: 'position'
        };

        this.positions = {
            QB: 6,
            RB: 5,
            WR: 4,
            TE: 3,
            Def: 2,
            PK: 1
        };

        this.positionSort = ( first, second ) => {
            let a = this.positions[ first.position ];
            let b = this.positions[ second.position ];
            if ( a < b ) {
                return 1;
            }
            if ( a > b ) {
                return -1;
            }
            return 0;
        };

        socket.on("starting lineup loaded", lineup => {
            let roster = this.tempRoster;
            let fullRoster = roster.map(player => {
                let starter = findWhere(lineup, { id: player.id });
                if ( starter === undefined ) {
                    return player;
                }
                if ( typeof starter.score === 'string' ) {
                    starter.score = starter.score || '0.0';
                    return Object.assign({}, player, starter);
                }
                return Object.assign({ status: 'starter' }, player, starter);
            });
            this.rosterLoaded(fullRoster);
        });

        socket.on("roster loaded", ( roster, id ) => {
            this.tempRoster = roster;
            socket.emit("load starting lineup", id, props.withScores);
        });
    }

    componentWillReceiveProps ( nextProps ) {
        if ( this.isLoading !== true && nextProps.id !== this.props.id ) {
            socket.emit("load roster", nextProps.id);
            this.isLoading = true;
        }
    }

    componentWillMount () {
        socket.emit("load roster", this.props.id);
        this.isLoading = true;
    }

    handlePlayerSort ( field ) {
        let _players = this.state._players.slice(0);
        let self = this;
        let sorter = {
            name () {
                if ( self.state.sorting === 'name' ) {
                    let players = self.state.players.slice(0);
                    return players.reverse();
                }
                return sortBy(_players, 'name');
            },
            position () {
                if ( self.state.sorting === 'position' ) {
                    let players = self.state.players.slice(0);
                    return players.reverse();
                }
                return _players.sort(self.positionSort);
            },
            team () {
                if ( self.state.sorting === 'team' ) {
                    let players = self.state.players.slice(0);
                    return players.reverse();
                }
                return sortBy(_players, 'team');
            },
            score () {
                if ( self.state.sorting === 'score' ) {
                    let players = self.state.players.slice(0);
                    return players.reverse();
                }
                return sortBy(_players, player => parseInt(player.score, 10));
            }
        }
        this.setState({
            players: sorter[ field ](),
            sorting: field
        });
    }

    rosterLoaded ( players ) {
        this.setState({
            players,
            _players: players
        });
        this.isLoading = false;
        this.tempRoster = null;
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.withScores !== this.props.withScores ||
            nextProps.id !== this.props.id ||
            nextState.players !== this.state.players ||
            nextState.sorting !== this.state.sorting;
    }

    render () {
        let playerList = this.state.players.length !== 0 ?
                         <PlayerList players={this.state.players}
                                     withScores={this.props.withScores}/> :
                         null;
        // Put back  table-hover if needed (class)
        return (
            <table className="table table-roster">
                <thead>
                    <TableHead sorting={this.state.sorting}
                               withScores={this.props.withScores}
                               handleSort={field => this.handlePlayerSort(field)} />
                </thead>
                {playerList}
            </table>
        );
    }
}

class TableHead extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.sorting !== this.props.sorting ||
            nextProps.withScores !== this.props.withScores;
    }

    render () {
        let nameClass = this.props.sorting === 'name' ? 'active' : '';
        let positionClass = this.props.sorting === 'position' ? 'active' : '';
        let teamClass = this.props.sorting === 'team' ? 'active' : '';
        let scoreColumn = null;
        if ( this.props.withScores === true ) {
            let scoreClass = this.props.sorting === 'score' ? 'active' : '';
            scoreColumn = (
                <th onClick={e => this.props.handleSort('score')}
                    className={scoreClass}>
                    Score
                </th>
            );
        }
        return (
            <tr>
                <th>
                    ID
                </th>
                {scoreColumn}
                <th onClick={e => this.props.handleSort('name')}
                    className={nameClass}>
                    Name
                </th>
                <th onClick={e => this.props.handleSort('position')}
                    className={positionClass}>
                    Position
                </th>
                <th onClick={e => this.props.handleSort('team')}
                    className={teamClass}>
                    Team
                </th>
            </tr>
        );
    }
}

export default Roster;
