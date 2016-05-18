"use strict";

const liveScoring = function ( matches, index, week ) {
    let updated = (new Date()).getTime();
    return {
        type: 'LIVE_SCORING_LOADED',
        data: {
            matches,
            index,
            updated,
            week
        }
    };
};

export default liveScoring;
