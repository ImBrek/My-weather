import {ENTITY_SELECT} from 'actions/entities';
import {addTown, DASHBOARD} from 'actions/dashboard'
import {TOWN} from 'actions/town'

export default function (state = {
    isFetching: false,
    selectedEntity: {},
    towns: []
}, action) {
    switch (action.type) {
        case DASHBOARD.TOWN.ADD:
            if (state.towns.indexOf(action.payload) == -1) {
                return Object.assign({}, state, {
                    towns: [...state.towns, action.payload]
                });
            } else {
                return state;
            }
        case DASHBOARD.TOWN.DELETE:
            return Object.assign({}, state, {
                towns: state.towns.reduce((result, row)=> {
                    if (row != action.payload) {
                        result.push(row)
                    }
                    return result;
                }, [])
            });
        case DASHBOARD.TOWN.INIT:
            return Object.assign({}, state, {
                towns: action.payload
            });
        case TOWN.READ.REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case TOWN.READ.SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case TOWN.READ.FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;

    }
}