import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
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

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers ?
        composeEnhancers(applyMiddleware(thunk)) :
        applyMiddleware(thunk),
);

const persistor = persistStore(store);

export {
    store,
    persistor,
};