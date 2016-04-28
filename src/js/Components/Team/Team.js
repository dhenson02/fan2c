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
        let icon = this.props.team.icon ?
                   true :
                   false;
        this.setState({
            icon
        });
    }

    componentWillReceiveProps ( nextProps ) {
        let icon = nextProps.team.icon ?
                   true :
                   false;
        this.setState({
            icon
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.icon !== this.state.icon ||
            nextProps.team.icon !== this.props.team.icon ||
            nextProps.team.name !== this.props.team.name;
    }

    handleIconError () {
        this.setState({
            icon: false
        });
    }

    render () {
        let team = this.props.team;
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
                             src={team.icon}/>
                    </span> {team.name}
                </h2>
                <TeamStats stats={team.stats}/>
            </div>
        );
    }
}

export default Team;
