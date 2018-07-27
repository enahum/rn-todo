import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import PropTypes from 'prop-types';

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
            <SafeAreaView style={style.container}>
                <Text style={style.title}>
                    Create!
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
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '600'
    },
    rightButton: {
        color: '#0BE6AF',
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    }
});