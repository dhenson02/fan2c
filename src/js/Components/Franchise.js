'use strict';

import React from 'react';
import Roster from "./Roster";
const socket = require('socket.io-client/socket.io')();

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: props.id,
            settings: props.settings
        };
    }

    render () {
        return (
            <div className="column">
                <div className="row">
                    <h3>
                        <img width="96" height="96" src={this.state.settings.icon}/>
                        {this.state.settings.name}
                    </h3>
                </div>
                <div className="row">
                    <Roster id={this.state.id}/>
                </div>
            </div>
        );
    }
}

export default Franchise;
