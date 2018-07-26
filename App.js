import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigation from 'app/screens';
import LoadingScreen from 'app/screens/loading';
import {store, persistor} from 'app/store';

export default class App extends PureComponent {
  render() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<LoadingScreen/>}
                persistor={persistor}
            >
                <StatusBar barStyle="light-content"/>
                <AppNavigation/>
            </PersistGate>
        </Provider>
    );
  }
}
