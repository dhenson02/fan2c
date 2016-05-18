'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socket from '../Socket';

import * as actions from '../Actions/index';

import Loader from './Loader';
import Navigation from './Navigation';

socket.emit("load league settings");

class App extends React.Component {
    constructor ( props ) {
        super(props);
        socket.on('league settings loaded', settings => {
            props.isLoading(false);
            props.loadSettings(settings);
        });
    }

    componentWillMount () {
        this.props.isLoading(true);
    }

    /*shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.loading !== this.props.loading ||
            nextProps.settings !== this.props.settings ||
            nextState.id !== this.state.id;
    }*/

    render () {
        const { settings, loading } = this.props;

        if ( settings.size === 0 ) {
            return <Loader visible={loading}/>;
        }
        let opacity = loading === true ?
                      0.2 :
                      1;
        return (
            <div className="col-xs-12">
                <Navigation />
                <header className="heading text-right">
                    <h5 className="title">
                        {settings.get('name')}
                    </h5>
                </header>
                <Loader visible={loading}/>
                <div style={{ willChange: 'opacity', opacity }}>

                    {React.cloneElement(this.props.children, this.props)}

                </div>
            </div>
        );
    }
}

/*

var old = (
    <div>
        <Franchise visible={this.state.page === 'rosters'}
                   id={this.state.id}>
            <Team id={this.state.id}
                  team={this.state.team}/>
            <TeamSelector teams={this.teams}
                          loading={this.state.isLoading}
                          handleChange={() => this.handleID()}/>
        </Franchise>
        <LiveScoring visible={this.state.page === 'live-scoring'}
                     setLoader={state => this.setState({ isLoading: state })}
                     week={13}/>
    </div>
);
*/

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

