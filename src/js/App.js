'use strict';

import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
const socket = require('socket.io-client/socket.io')();

socket.emit("load league settings");
socket.on("league settings loaded", settings => {
    console.log( window.location.search );
    render(<App settings={settings}/>, document.getElementById("main"))
});

