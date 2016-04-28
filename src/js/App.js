'use strict';

import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import Loader from './Components/Loader';
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
        if ( this.state.settings === null ) {
            socket.emit("load league settings");
        }
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.settings !== this.state.settings;
    }

    render () {
        let loading = this.state.settings === null;
        let app = loading === true ?
                  null :
                  <App settings={this.state.settings}/>;
        return (
            <div>
                <Loader visible={loading} />
                {app}
            </div>
        );
    }
}

render(<Main />, document.getElementById("main"));
