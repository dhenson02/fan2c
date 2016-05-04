'use strict';

import React from 'react';

class LiveScoring extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            week: 0,
            lastUpdated: 0
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.lastUpdated !== this.state.lastUpdated;
    }

    componentWillMount () {
        let lastUpdated = (new Date()).getTime();
        this.setState({
            teams: this.props.teams,
            week: this.props.week,
            lastUpdated
        })
    }

    setupMatches ( matches ) {
        return matches.map(( match, i ) => {
            return (
                <MatchUp key={i}
                         teamA={match.franchise[0]}
                         teamB={match.franchise[1]}/>
            );
        })
    }

    render () {
        let matches = this.setupMatches(this.props.teams);
        return (
            <div className="panel">
                <div className="panel-heading">
                    <h2>Live Scoring</h2>
                </div>
                <div className="panel-body table-responsive">
                    {matches}
                </div>
                <div className="panel-footer">
                    <h4>Week {this.state.week}</h4>
                </div>
            </div>
        );
    }
}

class MatchUp extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
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
            <div>
                <div className="col-xs-12 col-sm-6 table-responsive">
                    <Team name={teamA.name}
                          players={teamA.players}/>
                </div>
                <div className="col-xs-12 col-sm-6 table-responsive">
                    <Team name={teamB.name}
                          players={teamB.players}/>
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
        return nextState.total !== this.state.total ||
            nextState.lastUpdated !== this.state.lastUpdated;
    }

    componentWillMount () {
        let lastUpdated = (new Date()).getTime();
        this.setState({
            players: this.props.players,
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
            return (
                <Player key={i}
                        name={player.name}
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
                <h3 className="text-center">{this.props.name}</h3>
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

    render () {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.position}</td>
                <td>{this.props.team}</td>
                <td>{this.state.score}</td>
            </tr>
        );
    }
}

export default LiveScoring;
