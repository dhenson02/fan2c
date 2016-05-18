'use strict';

import { createStore } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import rootReducer from './Reducers';

// const middleware = routerMiddleware(hashHistory);

const store = createStore(rootReducer/*, middleware*/);

const history = syncHistoryWithStore(hashHistory, store);

export { store, history };
