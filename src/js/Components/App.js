'use strict';

import React from 'react';
import { findWhere } from 'lodash';
import Loader from './Loader';
import Navigation from './Navigation';
import Franchise from './Franchise';
import LiveScoring from './LiveScoring';
import Team from './Team/Team';
import socket from '../Socket';


class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: '',
            team: null,
            isLoading: false,
            page: ''
        };

        socket.on("franchise loaded", ( team, id ) => {
            this.setState({
                id,
                team,
                isLoading: false,
                page: 'rosters'
            });
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.isLoading !== this.state.isLoading ||
            nextState.page !== this.state.page ||
            nextProps.settings !== this.props.settings ||
            nextState.id !== this.state.id;
    }

    loadTeam ( id ) {
        this.setState({
            isLoading: true
        });
        socket.emit("load franchise", id);
    }

    componentWillMount () {
        this.setState({
            isLoading: true,
            page: 'live-scoring'
        });
    }

    setupFranchises ( settings ) {
        this.teams = settings.franchises.franchise;
        this.teamIDs = this.teams.map(team => team.id);
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

    handleID () {
        if ( this.state.isLoading === false ) {
            let id = document.getElementById('id-input').value;
            if ( id ) {
                this.loadTeam(id);
            }
        }
    }

    handleNav ( page ) {
        console.log(this.state.page, page);
        if ( this.state.page !== page ) {
            this.setState({
                page,
                isLoading: false
            });
        }
    }

    render () {
        if ( this.state.team === null ) {
            return null;
        }
        let opacity = this.state.isLoading === true ?
                      0.2 :
                      1;
        let settings = this.props.settings;

        let otherComponent = this.state.page === 'rosters' ? (
            <Franchise id={this.state.id}>
                <Team id={this.state.id}
                      team={this.state.team}/>
                <TeamSelector teams={this.teams}
                              loading={this.state.isLoading}
                              handleChange={() => this.handleID()}/>
            </Franchise>
        ) : (
            <LiveScoring setLoader={state => this.setState({ isLoading: state })}
                         week={13}/>
        );
        return (
            <div className="col-xs-12">
                <Navigation handleNav={page => this.handleNav(page)}
                            page={this.state.page} />
                <Loader visible={this.state.isLoading}/>
                <div style={{ opacity }}>
                    <header className="heading text-right">
                        <h5 className="title">
                            {settings.name}
                        </h5>
                    </header>
                    {otherComponent}
                </div>
            </div>
        );
    }
}

class TeamSelector extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.loading !== this.props.loading;
    }

    render () {
        let teamList = this.props.teams.map(( team, i ) => {
            return (
                <option key={i}
                        value={team.id}>
                    {team.name}
                </option>
            );
        });
        let disabled = this.props.loading ?
                       'disabled' :
                       '';
        return (
            <div className="form-group container">
                <div className="input-group">
                    <select className="form-control"
                            disabled={disabled}
                            onChange={() => this.props.handleChange()}
                            id="id-input">
                        {teamList}
                    </select>
                </div>
            </div>
        );
    }
}

export default App;
