import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class HomeScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    render() {
        return (
            <SafeAreaView style={style.container}>
                <Text style={style.title}>
                    Home!
                </Text>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03060D',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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