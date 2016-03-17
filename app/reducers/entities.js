import {get} from 'lodash/object'
import merge from 'lodash/merge'

const initValue = {
    towns: {},
}

export default function entities (state = initValue, action) {
    const entities = get(action, 'payload.response.entities');
    if (entities) {
        return merge({}, state, entities)
    }

    return state;
}
