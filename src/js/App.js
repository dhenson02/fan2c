'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './Data/Store';
import { Router, Route, IndexRoute } from 'react-router';

import App from './Components/App';
import TeamSelector from './TeamSelector';
import Franchise from './Components/Franchise';
import LiveScoring from './Components/LiveScoring';
import Roster from './Components/Roster';


render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={TeamSelector} />
                <Route path="live-scoring" component={LiveScoring}/>
                <Route path="rosters/:id" component={Franchise}/>
                {/*<Route path="/:id" component={Roster}/>*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main')
);
