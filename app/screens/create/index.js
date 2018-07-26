import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import PropTypes from 'prop-types';

import ScreenHeader from 'app/components/screen_header';

export default class CreateScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    static navigationOptions = ({navigation}) => {
        const disabled = navigation.getParam('disabled', true);

        return {
            headerRight: (
                <Button
                    transparent={true}
                    onPress={navigation.getParam('createTaskAction')}
                    disabled={disabled}
                >
                    <Text
                        style={[style.rightButton, disabled ? style.disabled: null]}
                    >
                        {'Crear'}
                    </Text>
                </Button>
            ),
        };
    };

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({createTaskAction: this.createTaskAction});
        setTimeout(() => {
            navigation.setParams({disabled: false});
        }, 5000);
    }

    createTaskAction = () => {
        const {navigation} = this.props;
        console.log('Time to create the task');
        navigation.navigate('Tasks');
        navigation.pop();
    };

    render() {
        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title='Crear Nueva Tarea'
                        separator={false}
                        titleContainerStyle={style.titleContainer}
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
    },
    titleContainer: {
        ...Platform.select({
            ios: {
                paddingTop: 10,
            },
            android: {
                paddingTop: 0,
            },
        }),
    },
    rightButton: {
        color: '#0BE6AF',
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    },
});