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

    componentWillMount () {
        socket.emit("load league settings");
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.settings !== this.state.settings;
    }

    render () {
        return <App settings={this.state.settings}/>;
    }
}

render(<Main />, document.getElementById("main"));
