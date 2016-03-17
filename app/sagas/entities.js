import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';
import {call, put, take, race, fork} from 'redux-saga/effects'
import {createAction} from 'redux-actions';

function* processRequest (payload, getState) {
    const actions = payload.actions;
    delete payload.actions;

    const {response, error} = yield call(fetch, payload);

    if (!error)
        yield put({
            type: actions.SUCCESS,
            payload: {
                request: payload,
                response
            }
        });
    else {
        yield put({
            type: actions.FAILURE,
            payload: {
                request: payload,
                error
            },
            error: true
        });
    }
}

export default function* watchEntities (getState) {
    while (true) {
        const {payload} = yield take((action)=> {
            return action.payload && [API_READ, API_UPDATE, API_CREATE, API_DELETE].indexOf(action.payload.method) != -1;
        });
        yield fork(processRequest, payload, getState)

    }
}