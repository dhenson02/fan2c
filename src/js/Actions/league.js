"use strict";

const loadSettings = function ( data ) {
    return {
        type: 'SETTINGS_LOADED',
        data
    };
};

export default loadSettings;
