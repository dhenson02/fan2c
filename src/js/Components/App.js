'use strict';

import React from 'react';
import { findWhere } from 'lodash';
import Franchise from './Franchise';
import Team from './Team/Team';
import socket from '../Socket';


class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: '',
            team: null,
            isLoading: false
        };

        socket.on("franchise loaded", ( team, id ) => {
            this.setState({
                id,
                team,
                isLoading: false
            });
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.isLoading !== this.state.isLoading ||
            nextState.id !== this.state.id;
    }

    loadTeam ( id ) {
        this.setState({
            isLoading: true
        });
        socket.emit("load franchise", id);
    }

    componentWillMount () {
        let id = this.state.id || '0001';
        let settings = this.props.settings;
        this.loadTeam(id);
        this.setupFranchises(settings);
    }

    setupFranchises ( settings ) {
        this.teams = settings.franchises.franchise;
        this.teamIDs = this.teams.map(team => team.id);
    }

    componentWillReceiveProps ( nextProps ) {
        this.setupFranchises(nextProps.settings);
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
        let settings = this.props.settings;
        let teamList = this.teamIDs.map(( id, i ) => {
            let team = findWhere(this.teams, { id });
            return (
                <option key={i} value={id}>
                    {team.name}
                </option>
            );
        });
        return (
            <div className="col-xs-12">
                <header className="heading text-right">
                    <h5 className="title">
                        {settings.name}
                    </h5>
                </header>
                <Franchise id={this.state.id}>
                    <Team id={this.state.id}
                          team={this.state.team}/>
                    <TeamSelector loading={this.state.isLoading}
                                  handleChange={() => this.handleID()}>
                        {teamList}
                    </TeamSelector>
                </Franchise>
            </div>
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
