'use strict';

import React from 'react';

class Loader extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.hidden !== this.props.hidden;
    }

    render () {
        let display = this.props.hidden === true ?
                      'none' :
                      'block';
        let style = { display };
        return (
            <div className="loader"
                 style={style}
                 id="loader">
                <div className="loader-a"></div>
                <div className="loader-b"></div>
            </div>
        );
    }
}

export default Loader;
