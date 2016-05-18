'use strict';

import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const loading = function ( state = false, action ) {
    switch ( action.type ) {
        case 'LOADING':
            return action.data.state;
        default:
            return state;
    }
};

const settings = function ( state = Map(), action ) {
    switch ( action.type ) {
        case 'SETTINGS_LOADED':
            return Map(action.data);
        default:
            return state;
    }
};

const franchise = function ( state = Map(), action ) {
    switch ( action.type ) {
        case 'FRANCHISE_LOADED':
            return Map(action.data.franchise);
        default:
            return state;
    }
};

const roster = function ( state = List(), action) {
    switch ( action.type ) {
        case 'ROSTER_LOADED':
            return List(action.data.roster);
        default:
            return state;
    }
};

const account = function ( state = Map(), action ) {
    // headers: { 'Cookie': 'MFL_USER_ID=cookie_value' }
    switch ( action.type ) {
        case 'LOGIN_ATTEMPT':
            return state.set({
                id: action.id,
                status: 'Attempting to login'
            });
        case 'LOGIN_SUCCESS':
            return state.set({
                id: action.id,
                status: `Logged in as ${action.data.name}`,
                response: action.data.response
            });
        case 'LOGIN_FAILURE':
            return state.set({
                id: action.id,
                status: `Login failed.  See console.`,
                response: action.data.response
            });
        case 'LOGOUT':
            return state.set({
                id: '',
                status: 'Logged out.'
            });
        default:
            return state;
    }
};

const lineup = function ( state = Map(), action ) {
    switch ( action.type ) {
        case 'LINEUP_CHANGE_SUCCESS':
            return state.set(action.week, action.players);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    loading,
    settings,
    franchise,
    account,
    lineup,
    roster,
    routing: routerReducer
});

export default rootReducer;
