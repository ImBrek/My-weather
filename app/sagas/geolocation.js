import {call, put, take, race, fork, cps} from 'redux-saga/effects';

import {GEOLOCATION} from 'actions/geolocation';

function request () {
    return new Promise((resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

function* processRequest () {
    var result;
    try {
        result = yield call(request)
    } catch (e) {
        yield put({
            type: GEOLOCATION.FAILURE,
            payload: e
        })
        return;
    }
    yield put({
        type: GEOLOCATION.SUCCESS,
        payload: result
    })
}

export function* watchGeolocationRequests () {
    while (true) {
        yield take(GEOLOCATION.REQUEST);
        yield fork(processRequest)
    }
}

