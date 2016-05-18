'use strict';

const loading = function ( state ) {
    return {
        type: 'LOADING',
        data: {
            state
        }
    };
};

export default loading;
