'use strict';

import React from 'react';
import findWhere from 'lodash.findwhere';
import Franchise from './Franchise';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: '',
            team: {},
            teams: [],
            teamIDs: []
        };
    }

    componentWillMount () {
        let id = this.props.id || '0001';
        this.setupFranchise(id);
    }

    setupFranchise ( id ) {
        let settings = this.props.settings;
        let teams = settings.franchises.franchise;
        let teamIDs = teams.map(team => team.id);
        let team = findWhere(teams, { id });
        this.setState({
            id,
            team,
            teams,
            teamIDs
        });
    }

    handleID ( event ) {
        event.preventDefault();
        let id = document.getElementById('id-input').value;
        if ( id ) {
            this.setupFranchise(id);
        }
    }

    render () {
        let settings = this.props.settings;
        let teamList = this.state.teamIDs.map(( id, i ) => {
            let team = findWhere(this.state.teams, { id });
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
                <div className="form-group">
                    <div className="input-group">
                        <select className="form-control"
                                onChange={e => this.handleID(e)}
                                id="id-input">
                            {teamList}
                        </select>
                    </div>
                </div>
                <Franchise id={this.state.id}
                           settings={this.state.team}/>
            </div>
        );
    }
}

export default App;
