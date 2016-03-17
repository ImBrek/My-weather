import {createAction} from 'redux-actions';

export const DASHBOARD = {
    TOWN: {
        ADD: 'DASHBOARD/TOWN_ADD',
        DELETE: 'DASHBOARD/TOWN_DELETE',
        INIT: 'DASHBOARD/TOWN_INIT'
    }
};

export const addTown = createAction(DASHBOARD.TOWN.ADD, (id)=> {
    return id
});

export const deleteTown = createAction(DASHBOARD.TOWN.DELETE, (id)=> {
    return id
});