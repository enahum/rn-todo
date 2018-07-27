import React, {PureComponent} from 'react';
import {
    Keyboard,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import {Button, Icon} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import UUID from 'uuid-js';

import CategoryList from 'app/components/category_list';
import DateItem from 'app/components/date_item';
import ScreenHeader from 'app/components/screen_header';

export default class CreateScreen extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            createTodo: PropTypes.func.isRequired,
        }).isRequired,
        navigation: PropTypes.object.isRequired,
    };

    static navigationOptions = ({navigation}) => {
        const disabled = navigation.getParam('disabled', true);

        return {
            headerRight: (
                <Button
                    transparent={true}
                    onPress={navigation.getParam('createTodoAction')}
                    disabled={disabled}
                >
                    <Text
                        style={[style.rightButton, disabled ? style.rightButtonDisabled: null]}
                    >
                        {'Crear'}
                    </Text>
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            important: false,
            category: '',
            date: Date.now(),
            notify: false,
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({createTodoAction: this.createTodoAction});
    }

    enableCreateIfReady = () => {
        const {navigation} = this.props;

        if (this.state.text && this.state.category) {
            navigation.setParams({disabled: false});
        } else {
            navigation.setParams({disabled: true});
        }
    };

    createTodoAction = () => {
        const {actions, navigation} = this.props;
        const {
            text,
            important,
            notify,
            category,
            date,
        } = this.state;

        actions.createTodo({
            id: UUID.create(4).hex,
            text,
            important,
            category,
            date,
        }, notify);

        navigation.navigate('Todos');
        navigation.pop();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    onChangeText = (text) => {
        this.setState({text}, this.enableCreateIfReady);
    };

    onSelectCategory = (category) => {
        this.setState({category}, this.enableCreateIfReady);
    };

    onDateSelected = (selectedDate) => {
        const {date} = this.state;
        const currentDate = moment(date);
        const hour = currentDate.hours();
        const minute = currentDate.minutes();
        const newDate = moment(selectedDate).set({hour, minute});
        this.setState({date: newDate.valueOf()});
    };

    onTimeSelected = (time) => {
        const {date} = this.state;
        const currentDate = moment(date);
        const year = currentDate.year();
        const month = currentDate.month();
        const day = currentDate.date();
        const newDate = moment(time).set({
            year,
            month,
            date: day,
            second: 0,
            millisecond: 0,
        });
        this.setState({date: newDate.valueOf()});
    };

    toggleImportant = () => {
        const {important} = this.state;
        this.setState({important: !important});
    };

    handleNotify = (value) => {
        this.setState({notify: value});
    };

    render() {
        const {category, notify, text, important, date} = this.state;

        return (
            <SafeAreaView style={style.safeArea}>
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <View style={style.container}>
                        <ScreenHeader
                            title='Crear Nueva Tarea'
                            separator={false}
                            titleContainerStyle={style.titleContainer}
                        />
                        <ScrollView
                            alwaysBounceVertical={false}
                        >
                            <View style={style.inputContainer}>
                                <TextInput
                                    autoCapitalize='sentences'
                                    autoCorrect={false}
                                    autoFocus={false}
                                    blurOnSubmit={true}
                                    disableFullscreenUI={true}
                                    enablesReturnKeyAutomatically={true}
                                    keyboardAppearance='dark'
                                    maxLength={80}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={this.onChangeText}
                                    placeholder='Escribe que quieres hacer'
                                    placeholderTextColor='#a4a4a4'
                                    returnKeyType='done'
                                    style={[style.textInput, {textAlign:  text ? 'left' : 'center'}]}
                                    underlineColorAndroid='transparent'
                                    value={text}
                                />
                                <View style={style.textCounterContainer}>
                                    <Text style={style.textCounter}>
                                        {`${text.length}/80`}
                                    </Text>
                                </View>
                            </View>
                            <View style={style.sectionContainer}>
                                <View style={style.categoryTitleContainer}>
                                    <Text style={style.categoryTitle}>
                                        {'Categorías'}
                                    </Text>
                                    <View style={style.importantContainer}>
                                        <TouchableOpacity onPress={this.toggleImportant}>
                                            <Icon
                                                name='md-star'
                                                style={{color: important ? '#f3bc18' : '#a4a4a4'}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.categoryItems}>
                                    <CategoryList
                                        itemStyle={style.categoryItem}
                                        onSelectCategory={this.onSelectCategory}
                                        selectedCategory={category}
                                    />
                                </View>
                            </View>
                            <View style={style.sectionContainer}>
                                <Text style={[style.categoryTitle, style.marginBottom]}>
                                    {'Fecha y Hora'}
                                </Text>
                                <DateItem
                                    label='Fecha'
                                    type='date'
                                    timestamp={date}
                                    onSelected={this.onDateSelected}
                                    separator={true}
                                />
                                <DateItem
                                    label='Hora'
                                    type='time'
                                    timestamp={date}
                                    onSelected={this.onTimeSelected}
                                    separator={true}
                                />
                                <View style={style.notificationContainer}>
                                    <View style={style.notificationTitleContainer}>
                                        <Text style={style.notificationTitle}>
                                            {'Notificación'}
                                        </Text>
                                    </View>
                                    <View style={style.notificationOptionContainer}>
                                        <Switch
                                            value={notify}
                                            onValueChange={this.handleNotify}
                                            onTintColor='#0BE6AF'
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
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
    },
    titleContainer: {
        paddingHorizontal: 20,
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
    rightButtonDisabled: {
        opacity: 0.5,
    },
    inputContainer: {
        marginTop: 20,
    },
    textInput: {
        backgroundColor: '#060d1a',
        color: '#FFFFFF',
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: '600',
        height: 130,
        paddingTop: 30,
        paddingHorizontal: 30,
        textAlignVertical: 'top',
        width: '100%',
    },
    textCounterContainer: {
        bottom: 10,
        position: 'absolute',
        right: 20,
    },
    textCounter: {
        color: '#a4a4a4',
        fontSize: 11,
    },
    sectionContainer: {
        marginTop: 20,
        backgroundColor: '#060d1a',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    categoryTitleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
    },
    categoryTitle: {
        flex: 1,
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600'
    },
    importantContainer: {
        justifyContent: 'flex-end',
    },
    categoryItems: {
        flex: 1,
        flexDirection: 'row',
    },
    categoryItem: {
        marginRight: 10,
    },
    marginBottom: {
        marginBottom: 20,
    },
    notificationContainer: {
        flexDirection: 'row',
    },
    notificationTitleContainer: {
        flex: 1,
    },
    notificationTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    notificationOptionContainer: {
        alignItems: 'flex-end',
    },
    notificationOption: {
        color: '#a4a4a4',
        fontSize: 17,
        fontWeight: '400',
    },
});