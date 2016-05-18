'use strict';

import React from 'react';

class TableHead extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.sorting !== this.props.sorting;
    }

    render () {
        let nameClass = this.props.sorting === 'name' ? 'active' : '';
        let positionClass = this.props.sorting === 'position' ? 'active' : '';
        let teamClass = this.props.sorting === 'team' ? 'active' : '';
        let scoreClass = this.props.sorting === 'score' ? 'active' : '';

        let scoreColumn = (
            <th onClick={e => this.props.scoreSort()}
                className={scoreClass}>
                Score
            </th>
        );

        return (
            <tr>
                {scoreColumn}
                <th onClick={e => this.props.nameSort()}
                    className={nameClass}>
                    Name
                </th>
                <th>
                    Injury
                </th>
                <th onClick={e => this.props.positionSort()}
                    className={positionClass}>
                    Position
                </th>
                <th onClick={e => this.props.teamSort()}
                    className={teamClass}>
                    Team
                </th>
            </tr>
        );
    }
}

export default TableHead;
