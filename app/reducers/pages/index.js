import {combineReducers} from 'redux';
import main from './main';
import {PAGE_ACTIVATE} from 'actions/pages/index';

const activeReducers = {
    main,
};

export default function (state, action) {

    if (state === undefined) {
        const newState = {
            activePage: 'none'
        }
        for (const name in activeReducers) {
            newState[name] = activeReducers[name](undefined, action);
        }
        return newState;
    }

    if (action.type == PAGE_ACTIVATE) {
        const newState = Object.assign({}, state, {
            activePage: action.payload.name
        })
        return newState;
    }

    if (state.activePage) {
        const newState = {
            activePage: state.activePage
        }
        for (const name in activeReducers) {
            newState[name] = (name == state.activePage) ? activeReducers[name](state[name], action) : state[name]
        }
        return newState
    }

    return state;
}

