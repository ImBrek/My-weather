import {createAction} from 'redux-actions';
import {createRequestTypes} from './helpers';

export const GEOLOCATION = createRequestTypes('GEOLOCATION');

export const getPosition = createAction(GEOLOCATION.REQUEST);
