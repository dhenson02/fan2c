'use strict';

import React from 'react';

class Loader extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.visible !== this.props.visible;
    }

    render () {
        let visibility = this.props.visible === true ?
                      'visible' :
                      'hidden';
        let style = { visibility };
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
