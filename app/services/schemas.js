import {Schema, arrayOf, normalize} from 'normalizr';

const town = new Schema('towns');

export default {
    TOWN: town,
    TOWN_ARRAY: arrayOf(town)
};