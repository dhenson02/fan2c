'use strict';

import React from 'react';

class TeamStats extends React.Component {
    constructor ( props ) {
        console.log(props.team.toJS());
        super(props);
    }

    /*shouldComponentUpdate ( nextProps ) {
        return nextProps.stats.id !== this.props.stats.id;
    }*/

    render () {
        let stats = this.props.stats;
        let ties = stats.h2ht !== '0' ?
                   <li>Ties: {stats.h2ht}</li> :
                   null;
        let pf = parseInt(stats.pf, 10);
        let pa = parseInt(stats.pa, 10);
        let ratio = Math.round(100 * (pa / pf));
        let ratioClass = ratio < 81 ?
                         'success' :
                         ( ratio < 90 ? 'warning' : 'danger' );
        return (
            <ul>
                <li>Wins: {stats.h2hw}</li>
                <li>Losses: {stats.h2hl}</li>
                {ties}
                <li>Points scored: {pf}</li>
                <li>Points against: {pa}</li>
                <li className={`label label-${ratioClass}`}>
                    Reverse Ratio: {ratio}%
                </li>
            </ul>
        );
    }
}

export default TeamStats;
