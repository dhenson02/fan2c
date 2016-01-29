'use strict';

import React from 'react';
import Roster from "./Roster";
const socket = require('socket.io-client/socket.io')();

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            id: props.id,
            settings: null
        };
        socket.on("franchise loaded", franchise => this.franchiseLoaded(franchise));
        socket.emit("load franchise", props.id);
    }

    franchiseLoaded ( franchise ) {
        this.setState({
            settings: franchise
        });
    }

    render () {
        let name = this.state.settings ? this.state.settings.name : "";
        return (
            <column>
                <row>
                    <h2>{name}</h2>
                </row>
                <row>
                    <Roster id={this.state.id}/>
                </row>
            </column>
        );
    }
}

export default Franchise;
