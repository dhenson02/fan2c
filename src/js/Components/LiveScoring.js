'use strict';

import React from 'react';
import socket from '../Socket';
const regName = /^([A-Za-z\-]+), ([A-Za-z\-]+)( [A-Za-z\-]+)?/;

class LiveScoring extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            matches: [],
            week: 0,
            lastUpdated: 0
        };
        socket.on("live scoring loaded", ( matches, index ) => {
            let lastUpdated = (new Date()).getTime();
            props.setLoader(false);
            this.setState({
                matches: matches,
                week: this.props.week,
                lastUpdated
            });
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.lastUpdated !== this.state.lastUpdated;
    }

    componentWillMount () {
        this.initScores();
    }

    initScores () {
        this.props.setLoader(true);
        socket.emit('load live scoring');
    }

    setupMatches ( matches ) {
        return matches.map(( match, i ) => {
            return (
                <MatchUp key={i}
                         teamA={match[0]}
                         teamB={match[1]}/>
            );
        })
    }

    render () {
        let matches = this.setupMatches(this.state.matches);
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h2>Live Scoring <small>Week {this.state.week}</small></h2>
                </div>
                <div className="panel-body table-responsive">
                    {matches}
                </div>
                <div className="panel-footer">

                </div>
            </div>
        );
    }
}

class MatchUp extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.teamA.id !== this.props.teamA.id ||
            nextProps.teamB.id !== this.props.teamB.id;
    }

    componentWillMount () {
        this.setState({
            teamA: this.props.teamA,
            teamB: this.props.teamB
        });
    }

    render () {
        let teamA = this.props.teamA;
        let teamB = this.props.teamB;
        return (
            <div className="col-xs-12 container">
                <div className="col-xs-12 col-sm-6 table-responsive">
                    <Team name={teamA.name}
                          players={teamA.players.player}
                          total={teamA.score}/>
                </div>
                <div className="col-xs-12 col-sm-6 table-responsive">
                    <Team name={teamB.name}
                          players={teamB.players.player}
                          total={teamB.score}/>
                </div>
            </div>
        );
    }
}

class Team extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            total: 0,
            lastUpdated: 0
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.total !== this.props.total ||
            nextState.lastUpdated !== this.state.lastUpdated;
    }

    componentWillMount () {
        let lastUpdated = (new Date()).getTime();
        this.setState({
            players: this.props.players,
            total: this.props.total,
            lastUpdated
        });
    }

    componentWillReceiveProps ( nextProps ) {
        let lastUpdated = (new Date()).getTime();
        let total = nextProps.players.reduce(( previous, current ) => {
            return previous + current.score;
        }, 0);
        this.setState({
            total,
            lastUpdated
        });
    }

    setupPlayers ( players ) {
        return players.map(( player, i ) => {
            let timeLeft = player.gameSecondsRemaining;
            return (
                <Player key={i}
                        name={player.name}
                        timeLeft={timeLeft}
                        score={player.score}
                        position={player.position}
                        team={player.team}/>
            )
        })
    }

    render () {
        let players = this.setupPlayers(this.props.players);
        return (
            <table className="table table-striped table-condensed">

                <thead>
                    <tr colspan="4">
                        <th>
                            <strong>
                                {this.props.name}
                            </strong>
                        </th>
                        <th></th>
                        <th></th>
                        <th>
                            {this.props.total}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {players}
                </tbody>
            </table>
        );
    }
}

class Player extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            score: 0
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.score !== this.state.score;
    }

    componentWillMount () {
        this.setState({
            score: this.props.score
        });
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.score !== this.props.score ) {
            this.setState({
                score: nextProps.score
            });
        }
    }

    convertTime ( sec ) {
        const time = parseInt(sec, 10);
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        let sliceCount = minutes < 100 ? -2 : -3;

        minutes = `0${minutes}`.slice(sliceCount);
        seconds = `0${seconds}`.slice(-2);

        return `${minutes}:${seconds}`;
    }

    render () {
        let name = this.props.name.replace(regName, "$2$3 $1");
        let timeLeft = this.convertTime(this.props.timeLeft);
        return (
            <tr>
                <td>
                    <sup>{this.props.position} </sup>
                    {name}
                </td>
                <td>{this.props.team}</td>
                <td>{timeLeft}</td>
                <td>{this.state.score}</td>
            </tr>
        );
    }
}

export default LiveScoring;
