import {call, put, take, race, fork, cancel} from 'redux-saga/effects'
import {change, isCancelError, startSubmit, stopSubmit} from 'redux-form';
import {push} from 'react-router-redux';

import {PAGE_ACTIVATE} from 'actions/pages/index';
import {TOWN} from 'actions/town';
import {DASHBOARD} from 'actions/dashboard';
import {GEOLOCATION} from 'actions/geolocation';

function* watchFetch () {
    try {
        while (true) {
            yield take(TOWN.READ.REQUEST);
            yield put(startSubmit('findTown'));
            yield take([TOWN.READ.SUCCESS, TOWN.READ.FAILURE]);
            yield put(stopSubmit('findTown'));
        }
    } catch (e) {

    }
}

function* watchAddTown () {
    try {
        yield take(DASHBOARD.TOWN.ADD);
        yield put(push('/'));
    } catch (e) {

    }
}

function* watchGeolocationSuccess () {
    try {
        while (true) {
            const action = yield take(GEOLOCATION.SUCCESS);
            yield put(change('findTown', 'lat', action.payload.coords.latitude));
            yield put(change('findTown', 'lon', action.payload.coords.longitude));
        }
    } catch (e) {

    }
}


export function* addTownPageWatch () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'addTown';
        });
        const action1 = yield fork(watchFetch);
        const action2 = yield fork(watchAddTown);
        const action3 = yield fork(watchGeolocationSuccess);

        yield take(PAGE_ACTIVATE);

        yield cancel(action1);
        yield cancel(action2);
        yield cancel(action3);
    }
}


