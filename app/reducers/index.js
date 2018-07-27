import {combineReducers} from 'redux';

import categories from './categories';
import todos from './todos';

export default combineReducers({
    categories,
    todos,
});