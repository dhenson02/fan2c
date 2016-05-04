'use strict';

import React from 'react';
import Roster from "./Roster";

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            showStarters: true
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.visible !== this.props.visible ||
            nextState.showStarters !== this.state.showStarters ||
            nextProps.id !== this.props.id;
    }

    handleWithScores ( e ) {
        e.preventDefault();
        let showStarters = !this.state.showStarters;
        this.setState({ showStarters });
    }

    render () {
        let scoreButtonClass = 'btn btn-success btn-sm';
        let scoreButtonText = 'Show all';
        if ( this.state.showStarters === false ) {
            scoreButtonClass = 'btn btn-default btn-sm';
            scoreButtonText = 'Hide non-starters';
        }
        let teamInfo = this.props.children || null;

        let styles = this.props.visible ?
                { visibility: 'visible' } :
                { visibility: 'hidden', position: 'absolute' };

        return (
            <div className="panel panel-default"
                 style={styles}>
                {teamInfo}
                <div>
                    <p className="text-center">
                        <a href="#"
                           className={scoreButtonClass}
                           onClick={e => this.handleWithScores(e)}>
                            {scoreButtonText}
                        </a>
                    </p>
                    <Roster id={this.props.id}
                            showStarters={this.state.showStarters} />
                </div>
            </div>
        );
    }
}

export default Franchise;
