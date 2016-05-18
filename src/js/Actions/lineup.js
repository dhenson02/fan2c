'use strict';

const lineup = function ( type, data ) {
    return {
        type: 'LINEUP_CHANGE_SUCCESS',
        data
    };
};

export default lineup;
