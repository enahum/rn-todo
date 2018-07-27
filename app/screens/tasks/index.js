import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import ScreenHeader from 'app/components/screen_header';
import {getDateWithFormat} from 'app/utils/helpers';

export default class TasksScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    render() {
        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title={getDateWithFormat()}
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