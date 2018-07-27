import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {Platform, StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Notifications, Permissions} from 'expo';

import AppNavigation from 'app/screens';
import LoadingScreen from 'app/screens/loading';
import {store, persistor} from 'app/store';

export default class App extends PureComponent {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('test-notifications', {
                name: 'Tests',
                sound: true,
                priority: 'high'
            });
        }
    }

    componentDidMount() {
        this.requestNotificationsPermission();
        this.listener = Notifications.addListener((event) => {
            if (event.origin === 'selected') {
                // TODO: Do something when a notification is tapped.
            } else if (event.origin === 'received' && Platform.OS === 'ios') {
                //TODO: when the app is in the foreground for iOS no notification
                // is presented by the OS and we need to handle that in-app.
            }
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    requestNotificationsPermission = async () => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    };

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
