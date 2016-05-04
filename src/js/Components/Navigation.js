'use strict';

import React from 'react';

class Navigation extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            page: ''
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.page !== this.state.page;
    }

    componentWillMount () {
        this.setState({
            page: this.props.page
        });
    }

    componentWillReceiveProps ( nextProps ) {
        if ( nextProps.page !== this.state.page ) {
            this.setState({
                page: nextProps.page
            });
        }
    }

    handleNav ( e, page ) {
        e.preventDefault();
        this.setState({
            page
        });
        this.props.handleNav(page);
    }

    render () {
        let liveScoringClass = `btn btn-lg btn-default ${this.state.page === 'live-scoring' ?
                                                         'active' :
                                                         ''}`;
        let rostersClass = `btn btn-lg btn-default ${this.state.page === 'rosters' ?
                                                        'active' :
                                                        ''}`;
        return (
            <nav>
                <a className={liveScoringClass}
                   href="#"
                   onClick={e => this.handleNav(e, 'live-scoring')}
                   id="nav-live-scoring">
                    Live Scoring
                </a>
                <a className={rostersClass}
                   href="#"
                   onClick={e => this.handleNav(e, 'rosters')}
                   id="nav-rosters">
                    Rosters
                </a>
            </nav>
        );
    }
}

export default Navigation;
