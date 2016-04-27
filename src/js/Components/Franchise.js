'use strict';

import React from 'react';
import Roster from "./Roster";
const socket = require('socket.io-client/socket.io')();

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            withScores: true
        };
    }

    componentWillMount () {
        this.setState({
            withScores: true
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.withScores !== this.state.withScores ||
            nextProps.id !== this.props.id ||
            nextProps.settings.icon !== this.props.settings.icon ||
            nextProps.settings.name !== this.props.settings.name;
    }

    handleWithScores ( e ) {
        e.preventDefault();
        let withScores = !this.state.withScores;
        this.setState({ withScores });
    }

    render () {
        let scoreButtonClass = 'btn btn-default btn-sm';
        let scoreButtonText = 'Hide scores';
        if ( this.state.withScores === false ) {
            scoreButtonClass = 'btn btn-success btn-sm';
            scoreButtonText = 'Show scores';
        }
        return (
            <div className="panel panel-default">
                <div className="jumbotron">
                    <h2>
                        <img className="img-circle"
                             width="48"
                             height="48"
                             src={this.props.settings.icon}/> {this.props.settings.name}
                    </h2>
                </div>
                <div>
                    <p className="text-center">
                        <a href="#"
                           className={scoreButtonClass}
                           onClick={e => this.handleWithScores(e)}>
                            {scoreButtonText}
                        </a>
                    </p>
                    <Roster id={this.props.id}
                            withScores={this.state.withScores} />
                </div>
            </div>
        );
    }
}

export default Franchise;
