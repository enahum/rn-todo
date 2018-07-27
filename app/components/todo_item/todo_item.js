import React, {PureComponent} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {SwipeRow, Button, Icon} from 'native-base';
import PropTypes from 'prop-types';

import CategoryItem from 'app/components/category_item';
import {getTimeWithFormat} from 'app/utils/helpers';

export default class TodoScreen extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            removeTodo: PropTypes.func.isRequired,
            toggleTodo: PropTypes.func.isRequired,
        }).isRequired,
        category: PropTypes.object.isRequired,
        todo: PropTypes.object.isRequired,
    };

    handleRemoveTodo = () => {
        const {actions, todo} = this.props;
        actions.removeTodo(todo.id);
    };

    handleToggleTodo = () => {
        const {actions, todo} = this.props;
        actions.toggleTodo(todo.id);
    };

    renderCheckBox = (completed) => {
        return (
            <TouchableOpacity
                style={style.checkBoxContainer}
                onPress={this.handleToggleTodo}
            >
            <View style={[style.checkBox, completed && style.checkBoxActive]}>
                <Icon name='ios-checkmark' style={style.checkColor}/>
            </View>
            </TouchableOpacity>
        );
    };

    renderRemoveOption = () => {
        return (
            <Button danger onPress={this.handleRemoveTodo}>
                <Icon active name="trash" />
            </Button>
        );
    };

    renderTodoItem = () => {
        const  {category, todo} = this.props;
        return (
            <View style={style.itemContainer}>
                <View style={style.horizontalWrapper}>
                    {this.renderCheckBox(todo.completed)}
                    <View style={style.bodyContainer}>
                        <Text style={[style.todoText, todo.completed && style.todoTextCompleted]}>
                            {todo.text}
                        </Text>
                    </View>
                </View>
                <View style={[style.horizontalWrapper, style.bottomWrapper]}>
                    {this.renderTodoTime()}
                    <CategoryItem
                        active={!todo.completed}
                        {...category}
                    />
                    {todo.important &&
                    <View style={style.importantContainer}>
                        <Icon
                            name='md-star'
                            style={{color: '#f3bc18'}}
                        />
                    </View>
                    }
                </View>
            </View>
        );
    };

    renderTodoTime = () => {
        const {completed, date, notificationId} = this.props.todo;

        return (
            <View style={[style.horizontalWrapper, style.dateContainer]}>
                {notificationId &&
                    <View style={style.notifyContainer}>
                        <Icon
                            name='ios-notifications'
                            style={[style.notifyIcon, style.dateColor, completed && style.dateColorCompleted]}
                        />
                    </View>
                }
                <Text style={[style.dateText, style.dateColor, completed && style.dateColorCompleted]}>
                    {getTimeWithFormat(date)}
                </Text>
            </View>
        );
    };

    render() {
        return (
            <SwipeRow
                style={style.container}
                disableRightSwipe={true}
                rightOpenValue={-75}
                body={this.renderTodoItem()}
                right={this.renderRemoveOption()}
            />
        );
    }
}

const style = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#060d1a',
        borderBottomWidth: 0,
    },
    itemContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    horizontalWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomWrapper: {
        marginTop: 15,
        marginLeft: 40,
    },
    bodyContainer: {
        marginRight: 45,
    },
    checkBoxContainer: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    checkBox: {
        backgroundColor: '#03060D',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5,
    },
    checkColor: {
        color: '#03060D',
    },
    checkBoxActive: {
        backgroundColor: '#4ef2bb',
    },
    todoText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '600',
    },
    todoTextCompleted: {
        color: '#a4a4a4',
        textDecorationLine: 'line-through',
    },
    dateContainer: {
        marginRight: 10,
    },
    dateColor: {
        color: '#f36c06',
    },
    dateColorCompleted: {
        color: '#a4a4a4',
    },
    dateText: {
        ...Platform.select({
            android: {
                top: 0,
            },
            ios: {
                top: -2
            }
        }),
        fontSize: 17,
        fontWeight: '600'
    },
    notifyContainer: {
        marginRight: 8,
    },
    notifyIcon: {
        fontSize: 19,
    },
    importantContainer: {
        alignItems: 'flex-end',
        flex: 1,
        ...Platform.select({
            android: {
                marginRight: 20,
            },
        }),
    },
});