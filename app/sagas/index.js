import {fork} from 'redux-saga/effects'

import watchEntities from './entities'


export default function* root (getState) {
    yield [
        fork(watchEntities, getState),
    ];
}
