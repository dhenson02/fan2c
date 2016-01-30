'use strict';

import React from 'react';
import lodash from 'lodash';
import Franchise from './Franchise';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <div className="row">
                    <h1 className="title">{this.props.settings.name}</h1>
                </div>
                <Franchise id="0001" settings={lodash.find(this.props.settings.franchises.franchise, { id: "0001" })}/>
            </div>
        );
    }
}

export default App;
