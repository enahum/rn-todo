import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';

import ScreenHeader from 'app/components/screen_header';

export default class TasksScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    getDateTitle = () => {
        const dt = moment();
        moment.locale('es');
        const month = dt.format('MMMM');

        return dt.format(`DD [${month.replace(month[0], month[0].toUpperCase())}], YYYY`);
    };

    render() {
        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title={this.getDateTitle()}
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