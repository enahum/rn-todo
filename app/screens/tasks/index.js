import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class TasksScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    render() {
        return (
            <SafeAreaView style={style.container}>
                <Text style={style.title}>
                    Tasks List
                </Text>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03060D',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                paddingTop: 20
            }
        })
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '600'
    }
});