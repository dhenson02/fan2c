"use strict";
import reqwest from 'reqwest';

const baseURL = 'http://www03.myfantasyleague.com/2015/import?JSON=1&L=45589&';

const connect = function ( data, callback ) {
    let url = `${baseURL}${data}`;
    reqwest({
        url,
        type: 'json',
        method: 'GET',
        crossOrigin: true,
        contentType: 'application/json',
        success: function ( response ) {
            loading(false);
            return response.content && !response.content.error ?
                   callback('success') :
                   callback('failure')
        },
        error: function ( error ) {
            loading(false);
            console.error(error);
            return callback('failure');
        }
    });
};

export default connect;
