'use strict';

import React from 'react';

class Account extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }

    componentWillMount () {
        this.setState({});
    }

    render () {
        return (
            <div className="">

            </div>
        );
    }
}

class Login extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }

    componentWillMount () {
        this.setState({});
    }

    render () {
        return (
            <div className="">

            </div>
        );
    }
}

class Logout extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }

    componentWillMount () {
        this.setState({});
    }

    render () {
        return (
            <div className="">

            </div>
        );
    }
}

export default Account;
