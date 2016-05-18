'use strict';

import React from 'react';
import TeamStats from './TeamStats';

class Team extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            icon: '//placekitten.com/48/49'
        };
    }

    componentWillMount () {
        let icon = this.props.franchise.get('icon') ?
                   true :
                   false;
        this.setState({
            icon
        });
    }

    componentWillReceiveProps ( nextProps ) {
        let icon = nextProps.franchise.get('icon') ?
                   true :
                   false;
        this.setState({
            icon
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.icon !== this.state.icon ||
            nextProps.franchise.get('icon') !== this.props.franchise.get('icon') ||
            nextProps.franchise.get('name') !== this.props.franchise.get('name');
    }

    handleIconError () {
        this.setState({
            icon: false
        });
    }

    render () {
        let team = this.props.franchise;
        if ( !team || team.size === 0 ) {
            return null;
        }
        let iconClass = this.state.icon ?
                        "img-circle" :
                        "img-circle icon-missing";
        return (
            <div className="jumbotron">
                <h2>
                    <span className={iconClass}>
                        <img className="img-circle"
                             width="48"
                             height="48"
                             onError={() => this.handleIconError()}
                             src={team.get('icon')}/>
                    </span> {team.get('name')}
                </h2>
                <TeamStats team={team} stats={team.get('stats')}/>
            </div>
        );
    }
}

export default Team;
