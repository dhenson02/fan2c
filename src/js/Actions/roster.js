'use strict';

const roster = function ( roster, id ) {
    return {
        type: 'ROSTER_LOADED',
        data: {
            id,
            roster
        }
    };
};

export default roster;
