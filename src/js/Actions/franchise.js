'use strict';
import socket from '../Socket';
import { store } from '../Data/Store';

const franchise = function ( franchise ) {
    return {
        type: 'FRANCHISE_LOADED',
        data: {
            franchise
        }
    };
};
/*

const loadFranchise = function ( id ) {
    socket.emit("load franchise", id);
};

socket.on("franchise loaded", ( team, id ) => {
    store.dispatch({
        type: 'FRANCHISE_LOADED',
        data: {
            id,
            team
        }
    });
});
*/

export default franchise;
