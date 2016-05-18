'use strict';

import React from 'react';
import { sortBy } from 'lodash';

import Sorter from '../Utility/sorting';
import socket from '../Socket';

import PlayerList from './Player/PlayerList';
import TableHead from './TableHead';

class Roster extends React.Component {

    constructor ( props ) {
        super(props);
        this.isLoading = false;
        this.state = {
            players: [],
            _players: [],
            sorting: 'position'
        };

        socket.on('roster loaded', ( roster, id ) => {
            props.isLoading(false);
            props.loadRoster(roster, id);
            this.rosterLoaded(roster);
        });

        /*socket.on("starting lineup loaded", lineup => {
            let roster = this.tempRoster;
            let fullRoster = roster.map(player => {
                let starter = findWhere(lineup, { id: player.id });
                if ( starter === undefined ) {
                    return Object.assign({ status: 'nonstarter' }, player);
                }
                /!*if ( typeof starter.score === 'string' ) {
                    starter.score = starter.score || '0.0';
                    return Object.assign({}, player, starter);
                }
                return Object.assign({ status: 'starter' }, player, starter);*!/
                return Object.assign({ status: starter.status }, player);
            });
            this.rosterLoaded(fullRoster);
        });*/

        // socket.on("roster loaded", ( roster, id ) => {
            // this.tempRoster = roster;
            // id = id || this.props.id;
            // socket.emit("load starting lineup", id, props.showStarters);
        // });
    }

    /*componentWillReceiveProps ( nextProps ) {
        if ( this.props.loading !== true && nextProps.params.id !== this.props.params.id ) {
            this.isLoading(true);
            socket.emit("load roster", nextProps.params.id);
        }
    }*/

    componentWillMount () {
        this.props.isLoading(true);
        socket.emit("load roster", this.props.params.id || '0001');
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
        return nextProps.params.id !== this.props.params.id ||
            nextState.players !== this.state.players ||
            nextState.sorting !== this.state.sorting;
    }

    render () {
        let playerList = this.state.players.length !== 0 ?
                         <PlayerList players={this.state.players} {...this.props} /> :
                         null;
        return (
            <table className="table table-roster table-condensed">
                <thead>
                    <TableHead sorting={this.state.sorting}
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

export default Roster;
