'use strict';

import React from 'react';
import Team from './Team/Team';
import Roster from './Roster';
import { findWhere } from 'lodash';

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
        this.state = {
            showStarters: true
        };
    }

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextState.showStarters !== this.state.showStarters ||
            nextProps.params.id !== this.props.params.id;
    }

    componentWillMount () {
        let id = this.props.params.id || '0002';
        let franchises = this.props.settings.get('franchises').franchise;
        if ( id ) {
            let franchise = findWhere(franchises, { id });
            this.props.loadFranchise(franchise);
        }
        // let id = this.props.params.id || '0001';
        // let franchises = this.props.settings.get('franchises').franchise;
        // let franchise = findWhere(franchises, { id });
        // this.props.loadFranchise(franchise);
    }

    /*componentWillReceiveProps ( nextProps ) {
        if ( nextProps.params.id ) {
            let id = nextProps.params.id || '0001';
            franchise(id);
        }
    }*/

    /*handleWithScores ( e ) {
        e.preventDefault();
        let showStarters = !this.state.showStarters;
        this.setState({ showStarters });
    }*/

    render () {
        return (
            <div>
                <Team {...this.props}/>
                <Roster {...this.props}/>
                {/*React.cloneElement(this.props.children, this.props)*/}

            </div>
        );
    }
}

export default Franchise;
