'use strict';

import React from 'react';
import PlayerList from './Player/PlayerList';
import { sortBy } from 'lodash';
import Sorter from '../Utility/sorting';
import findWhere from 'lodash.findwhere';
import socket from '../Socket';

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
        this.isLoading = false;
        this.state = {
            players: [],
            _players: [],
            sorting: 'position'
        };

        socket.on("starting lineup loaded", lineup => {
            let roster = this.tempRoster;
            let fullRoster = roster.map(player => {
                let starter = findWhere(lineup, { id: player.id });
                if ( starter === undefined ) {
                    return Object.assign({ status: 'nonstarter' }, player);
                }
                /*if ( typeof starter.score === 'string' ) {
                    starter.score = starter.score || '0.0';
                    return Object.assign({}, player, starter);
                }
                return Object.assign({ status: 'starter' }, player, starter);*/
                return Object.assign({ status: starter.status }, player);
            });
            this.rosterLoaded(fullRoster);
        });

        socket.on("roster loaded", ( roster, id ) => {
            this.tempRoster = roster;
            socket.emit("load starting lineup", id, props.showStarters);
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

    rosterLoaded ( players ) {
        this.setState({
            _players: players
        });
        this.isLoading = false;
        this.tempRoster = null;
        switch ( this.state.sorting ) {
            case 'name':
                this.nameSort(players);
                break;
            case 'position':
                this.positionSort(players);
                break;
            case 'team':
                this.teamSort(players);
                break;
            case 'score':
                this.scoreSort(players);
                break;
            default:
                break;
        }
    }

    nameSort ( loadedPlayers ) {
        let sortedPlayers = [];
        let _players = loadedPlayers || this.state._players.slice(0);
        if ( this.state.sorting === 'name' && loadedPlayers === undefined ) {
            let players = this.state.players.slice(0);
            sortedPlayers = players.reverse();
        }
        else {
            sortedPlayers = sortBy(_players, 'name');
        }
        this.setState({
            players: sortedPlayers,
            sorting: 'name'
        });
    }

    positionSort (loadedPlayers) {
        let sortedPlayers = [];
        let _players = loadedPlayers || this.state._players.slice(0);
        if ( this.state.sorting === 'position' && loadedPlayers === undefined ) {
            let players = this.state.players.slice(0);
            sortedPlayers = players.reverse();
        }
        else {
            sortedPlayers = _players.sort(Sorter.positionSort);
        }
        this.setState({
            players: sortedPlayers,
            sorting: 'position'
        });
        return ;
    }

    teamSort ( loadedPlayers ) {
        let sortedPlayers = [];
        let _players = loadedPlayers || this.state._players.slice(0);
        if ( this.state.sorting === 'team' && loadedPlayers === undefined ) {
            let players = this.state.players.slice(0);
            sortedPlayers = players.reverse();
        }
        else {
            sortedPlayers = sortBy(_players, 'team');
        }
        this.setState({
            players: sortedPlayers,
            sorting: 'team'
        });
    }

    scoreSort ( loadedPlayers ) {
        let sortedPlayers = [];
        let _players = loadedPlayers || this.state._players.slice(0);
        if ( this.state.sorting === 'score' && loadedPlayers === undefined ) {
            let players = this.state.players.slice(0);
            sortedPlayers = players.reverse();
        }
        else {
            sortedPlayers = _players.sort(( a, b ) => {
                let _a = a.score;
                let _b = b.score;
                if ( _a > _b ) {
                    return 1;
                }
                if ( _a < _b ) {
                    return -1;
                }
                return 0;
            });
        }
        this.setState({
            players: sortedPlayers,
            sorting: 'score'
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.showStarters !== this.props.showStarters ||
            nextProps.id !== this.props.id ||
            nextState.players !== this.state.players ||
            nextState.sorting !== this.state.sorting;
    }

    render () {
        let playerList = this.state.players.length !== 0 ?
                         <PlayerList players={this.state.players}
                                     showStarters={this.props.showStarters}/> :
                         null;
        // Put back  table-hover if needed (class)
        return (
            <table className="table table-roster">
                <thead>
                    <TableHead sorting={this.state.sorting}
                               showStarters={this.props.showStarters}
                               nameSort={() => this.nameSort()}
                               positionSort={() => this.positionSort()}
                               teamSort={() => this.teamSort()}
                               scoreSort={() => this.scoreSort()} />
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
            nextProps.showStarters !== this.props.showStarters;
    }

    render () {
        let nameClass = this.props.sorting === 'name' ? 'active' : '';
        let positionClass = this.props.sorting === 'position' ? 'active' : '';
        let teamClass = this.props.sorting === 'team' ? 'active' : '';
        let scoreColumn = null;
        if ( this.props.showStarters === true ) {
            let scoreClass = this.props.sorting === 'score' ? 'active' : '';
            scoreColumn = (
                <th onClick={e => this.props.scoreSort()}
                    className={scoreClass}>
                    Score
                </th>
            );
        }
        return (
            <tr>
                {scoreColumn}
                <th onClick={e => this.props.nameSort()}
                    className={nameClass}>
                    Name
                </th>
                <th>
                    Injury
                </th>
                <th onClick={e => this.props.positionSort()}
                    className={positionClass}>
                    Position
                </th>
                <th onClick={e => this.props.teamSort()}
                    className={teamClass}>
                    Team
                </th>
            </tr>
        );
    }
}

export default Roster;
