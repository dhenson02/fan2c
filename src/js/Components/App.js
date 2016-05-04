'use strict';

import React from 'react';
import { findWhere } from 'lodash';
import Loader from './Loader';
import Navigation from './Navigation';
import FranchiseInfo from './FranchiseInfo';
import LiveScoring from '../Views/LiveScoring';
import Team from './Team/Team';
import socket from '../Socket';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            page: 'blank',
            isLoading: false
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.settings !== this.props.settings ||
            nextState.page !== this.state.page;
    }

    componentWillMount () {
        this.setState({
            isLoading: true
        });
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.settings !== null && nextProps.settings.franchises ) {
            this.setupFranchises(nextProps.settings);
        }
        else {
            this.setState({
                isLoading: false
            });
        }
    }

    setupFranchises ( settings ) {
        this.teams = settings.franchises.franchise;
        this.teamIDs = this.teams.map(team => team.id);
    }

    handleNav ( e, page ) {
        e.preventDefault();
        if ( page !== this.state.page ) {
            this.setState({
                page
            })
        }
    }

    render () {
        let settings = this.props.settings;

        let result = null;
        if ( this.state.page === 'live-scoring' ) {
            result = (
                <LiveScoring teams={this.teams}
                             teamIDs={this.teamIDs}/>
            );
        }
        if ( this.state.page === 'franchises' ) {
            result = <Franchise settings={settings} />;
        }

        let style = this.state.isLoading === true ?
                { opacity: 0.2, pointerEvents: 'none' } :
                { opacity: 1 };

        return (
            <div className="col-xs-12">
                <Loader visible={this.state.isLoading}/>
                <div style={style}>

                    <Navigation page={this.state.page}
                                name={settings.name}
                                handleNav={( e, page ) => this.handleNav(e, page)} />

                    {result}

                </div>
            </div>
        );
    }
}

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: '',
            team: null
        };

        socket.on("franchise loaded", ( team, id ) => {
            this.setState({
                id,
                team
            });
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.settings !== this.props.settings ||
            nextState.id !== this.state.id;
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.settings !== null && nextProps.settings.franchises ) {
            let id = this.state.id || '0001';
            let settings = nextProps.settings;
            this.loadTeam(id);
            this.setupFranchises(settings);
        }
        else {
            this.setState({
                isLoading: true
            });
        }
    }

    loadTeam ( id ) {
        this.setState({
            isLoading: true
        });
        socket.emit("load franchise", id);
    }

    handleID () {
        if ( this.state.isLoading === false ) {
            let id = document.getElementById('id-input').value;
            if ( id ) {
                this.loadTeam(id);
            }
        }
    }

    render () {
        if ( this.state.team === null ) {
            return null;
        }
        let teamList = this.teams.map(( team, i ) => {
            return (
                <option key={i} value={team.id}>
                    {team.name}
                </option>
            );
        });

        return (
            <FranchiseInfo id={this.state.id}>
                <Team id={this.state.id}
                      team={this.state.team}/>
                <TeamSelector handleChange={() => this.handleID()}>
                    {teamList}
                </TeamSelector>
            </FranchiseInfo>
        );
    }
}

class TeamSelector extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return true;
    }

    render () {
        let kids = this.props.children || null;
        let disabled = this.props.loading ?
                       'disabled' :
                       '';
        return (
            <div className="form-group">
                <div className="input-group">
                    <select className="form-control"
                            disabled={disabled}
                            onChange={() => this.props.handleChange()}
                            id="id-input">
                        {kids}
                    </select>
                </div>
            </div>
        );
    }
}

export default App;
