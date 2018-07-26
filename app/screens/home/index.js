import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Constants} from 'expo';

import ScreenHeader from 'app/components/screen_header';

export default class HomeScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    getWelcomePrompt = () => {
        const hrs = new Date().getHours();

        if (hrs < 12) {
            return 'Buenos días';
        } else if (hrs >= 12 && hrs <= 20) {
            return 'Buenas tardes';
        } else {
            return 'Buenas noches'
        }
    };

    render() {
        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title={this.getWelcomePrompt()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#03060D',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        ...Platform.select({
            android: {
                paddingTop: 20
            }
        })
    },
});