import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from 'app/reducers';
import initialState from './initial_state';

let composeEnhancers;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = composeWithDevTools({
        name: 'Todo App',
        hostname: 'localhost',
        port: 5678,
        realtime: true,
    });
}


const store = createStore(
    reducers,
    initialState,
    composeEnhancers ?
        composeEnhancers(applyMiddleware(thunk)) :
        applyMiddleware(thunk),
);


export default store;