import {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';
import config from 'config';

export default store => next => action => {
    let result = next(action);
    if (action.payload && [API_READ, API_UPDATE, API_CREATE, API_DELETE].indexOf(action.payload.method) != -1) {
        action.payload.queryParams || (action.payload.queryParams = {});
        action.payload.queryParams.APPID = config.apiKey
    }
    return result
}