'use strict';

import React from 'react';
import { Link } from 'react-router';

class TeamSelector extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: ''
        };
    }

    componentWillMount () {
        this.setState({
            id: '0001'
        });
    }

    /*shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.loading !== this.props.loading ||
            nextProps.franchises !== this.props.franchises;
    }*/

    handleID ( e ) {
        if ( this.props.loading === false ) {
            let id = e.target.value;
            console.log(id);
            this.setState({
                id
            });
        }
    }

    render () {
        let franchises = this.props.settings.get('franchises').franchise;
        let teamList = franchises.map(( team, i ) => {
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
                            onChange={e => this.handleID(e)}
                            id="id-input">
                        {teamList}
                    </select>
                    <Link to={`/rosters/${this.state.id}`}>
                        GO
                    </Link>
                </div>
            </div>
        );
    }
}

export default TeamSelector;
