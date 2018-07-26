import React from 'react';
import {StyleSheet, View} from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={style.container}/>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03060D',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default LoadingScreen;