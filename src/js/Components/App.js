'use strict';

import React from 'react';
import findWhere from 'lodash.findwhere';
import Franchise from './Franchise';

class App extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    render () {
        let settings = this.props.settings;
        let franchise = settings.franchises.franchise;
        let team = findWhere(franchise, { id: "0001" });
        return (
            <div className="column">
                <div className="row">
                    <h1 className="title">
                        {settings.name}
                    </h1>
                </div>
                <Franchise id="0001" settings={team}/>
            </div>
        );
    }
}

export default App;
