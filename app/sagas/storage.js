import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';
import {call, put, take, race, fork} from 'redux-saga/effects'

import {TOWN} from 'actions/town';
import {DASHBOARD} from 'actions/dashboard'

export function* watchForStorage (getState) {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
        yield put({
            type: TOWN.READ.SUCCESS,
            payload: {
                response: {
                    entities: {
                        towns: data.entities
                    },
                    result: data.ids
                }
            }
        });
        yield put({
            type: DASHBOARD.TOWN.INIT,
            payload: data.ids
        });
    }
    while (true) {
        yield take([TOWN.READ.SUCCESS, DASHBOARD.TOWN.ADD, DASHBOARD.TOWN.DELETE])
        const state = getState();
        const {entities:{towns:towns}, pages:{main:{towns:ids}}} = state;

        const data = {
            ids,
            entities: ids.reduce((result, id)=> {
                result[id] = towns[id];
                return result;
            }, {})
        };
        localStorage.setItem('data', JSON.stringify(data));

    }
}