'use strict';

import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import socket from './Socket';

class Main extends React.Component {
    constructor () {
        super();
        this.state = {
            settings: null
        };
        socket.on("league settings loaded", settings => {
            this.setState({
                settings
            });
        });
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.settings !== this.state.settings;
    }

    componentWillMount () {
        if ( this.state.settings === null ) {
            this.setState({
                settings: {}
            });
            socket.emit("load league settings");
        }
    }

    render () {
        return (
            <div className="col-xs-12">
                <App settings={this.state.settings}/>
            </div>
        );
    }
}

render(<Main />, document.getElementById("main"));
