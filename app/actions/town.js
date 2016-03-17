import {createAction} from 'redux-actions';

import {createCRUD} from 'actions/helpers';
import {API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'services/schemas';

export const TOWN = createCRUD('TOWN');

export const getTowns = createAction(TOWN.READ.REQUEST, (title, coord, ids)=> {
    let url = 'find';
    const params = {
        type: 'like',
        sort: 'population',
        cnt: 10
    };
    if (title) {
        params.q = title
    }
    if (coord) {
        params.lon = coord.lon;
        params.lat = coord.lat;
    }
    if (ids) {
        params.id = ids.join(',');
        url = 'group';
    }
    return {
        method: API_READ,
        endpoint: url,
        queryParams: params,
        actions: TOWN.READ,
        schema: schemas.TOWN_ARRAY,
        plural: true
    }
});