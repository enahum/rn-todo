import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBar from 'app/components/tab_bar';
import CreateScreen from 'app/screens/create';
import HomeScreen from 'app/screens/home';
import TasksScreen from 'app/screens/tasks';

const TabStack = createBottomTabNavigator({
    Home: { screen: HomeScreen },
    Tasks: { screen: TasksScreen },
}, {
    initialRoute: 'Home',
    cardStyle: {
        backgroundColor: 'red',
        opacity: 1,
    },
    tabBarOptions: {
        activeTintColor: '#fff'
    },
    tabBarComponent: props => {
        return (
            <TabBar {...props}/>
        );
    },
});

export default createStackNavigator({
    Main: {
        screen: TabStack,
        navigationOptions: {
            headerTransparent: true,
        }
    },
    Create: {
        screen: CreateScreen,
        navigationOptions: {
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#03060D',
            },
        }
    },
}, {
    mode: 'modal'
})