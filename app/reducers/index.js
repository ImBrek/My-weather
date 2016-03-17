import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import entities from './entities';
import pages from './pages';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    routing,
    entities,
    pages,
    form: formReducer
});

export default rootReducer;
