'use strict';

import React from 'react';

class Navigation extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.page !== this.props.page;
    }

    componentWillMount () {
        this.setState({
            page: this.props.page
        });
    }

    /*componentWillReceiveProps ( nextProps ) {
        if ( nextProps.page !== this.state.page ) {
            this.setState({
                page: nextProps.page
            });
        }
    }*/

    render () {
        let liveScoringClass = `btn btn-lg btn-default ${this.state.page === 'live-scoring' ?
                                                         'active' :
                                                         ''}`;
        let franchisesClass = `btn btn-lg btn-default ${this.state.page === 'franchises' ?
                                                         'active' :
                                                         ''}`;
        let blankClass = `btn btn-lg btn-default ${this.state.page === 'blank' ?
                                                         'active' :
                                                         ''}`;
        return (
            <header className="heading text-right">
                <h5 className="title">
                    {this.props.name}
                </h5>
                <a className={liveScoringClass}
                   href="#"
                   onClick={e => this.props.handleNav(e, 'live-scoring')}
                   id="nav-live-scoring">
                    Live Scoring
                </a>
                <a className={franchisesClass}
                   href="#"
                   onClick={e => this.props.handleNav(e, 'franchises')}
                   id="nav-franchises">
                    Rosters
                </a>
                <a className={blankClass}
                   href="#"
                   onClick={e => this.props.handleNav(e, 'blank')}
                   id="nav-blank">
                    Blank
                </a>
            </header>
        );
    }
}

export default Navigation;
