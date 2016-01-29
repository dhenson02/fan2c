'use strict';

import React from 'react';
import Roster from './Roster';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <h1>{this.props.settings.name}</h1>
                <Roster id="0001"/>
            </div>
        );
    }
}

export default App;
