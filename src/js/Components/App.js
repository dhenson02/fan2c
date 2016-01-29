'use strict';

import React from 'react';
import Franchise from './Franchise';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <column cols="8">
                <h1 className="title">{this.props.settings.name}</h1>
                <Franchise id="0001"/>
            </column>
        );
    }
}

export default App;
