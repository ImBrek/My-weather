import {combineReducers} from 'redux';
import main from './main';
import addTown from './addTown';

export default combineReducers({
    main,
    addTown
});