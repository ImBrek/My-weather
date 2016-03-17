import {fork} from 'redux-saga/effects'

import watchEntities from './entities'
import * as mainPage from './pages/main'
import * as addTownPage from './pages/addTown'
import * as storage from './storage'
import * as geolocation from './geolocation'


export default function* root (getState) {
    yield [
        fork(watchEntities, getState),
        fork(mainPage.mainPageWatch),
        fork(addTownPage.addTownPageWatch),
        fork(storage.watchForStorage, getState),
        fork(geolocation.watchGeolocationRequests),
    ];
}
