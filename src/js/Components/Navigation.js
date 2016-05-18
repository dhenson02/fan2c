'use strict';

import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
    constructor ( props ) {
        super(props);
    }

    static shouldComponentUpdate () {
        return false;
    }

    /*componentWillMount () {
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
    }*/

    render () {
        /*let liveScoringClass = `btn btn-lg btn-default ${this.state.page === 'live-scoring' ?
                                                         'active' :
                                                         ''}`;
        let rostersClass = `btn btn-lg btn-default ${this.state.page === 'rosters' ?
                                                        'active' :
                                                        ''}`;*/
        return (
            <nav>
                <Link to="/live-scoring"
                      className="btn btn-lg btn-default">
                    Live Scoring
                </Link>
                <Link to="/rosters"
                      className="btn btn-lg btn-default">
                    Rosters
                </Link>
            </nav>
        );
    }
}

export default Navigation;
