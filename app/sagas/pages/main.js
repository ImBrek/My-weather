import {call, put, take, race, fork, cancel} from 'redux-saga/effects'


import {PAGE_ACTIVATE} from 'actions/pages/index';

export function* mainPageWatch () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'main';
        });
        yield take(PAGE_ACTIVATE);
    }
}