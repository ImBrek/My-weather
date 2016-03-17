import {TOWN} from 'actions/town';
import {ENTITY_SELECT} from 'actions/entities';

export default function (state = {
    isFetching: false,
    selectedEntity: {},
    towns: []
}, action) {
    switch (action.type) {
        case TOWN.READ.REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case TOWN.READ.SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                towns: action.payload.response.result
            });
        case TOWN.READ.FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        // case ENTITY_SELECT:
        //     return Object.assign({}, state, {
        //         selectedEntity: action.payload
        //     })

        default:
            return state;

    }
}