import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import entities from './entities';
import pages from './pages';

const rootReducer = combineReducers({
    routing,
    entities,
    pages,
});

export default rootReducer;
