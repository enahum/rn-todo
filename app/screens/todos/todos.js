import React, {PureComponent} from 'react';
import {
    Image,
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import ScreenHeader from 'app/components/screen_header';
import TodoItem from 'app/components/todo_item';
import {getDateWithFormat} from 'app/utils/helpers';
import emptyTodo from 'assets/todos.png';

export default class TodoScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        todoIds: PropTypes.array.isRequired,
    };

    keyExtractor = (key) => key;

    renderEmptyList = () => {
        return (
            <View style={style.emptyContainer}>
                <Image
                    source={emptyTodo}
                    style={style.emptyImage}
                />
                <Text style={style.emptyTitle}>
                    {'No hay tareas'}
                </Text>
                <View style={style.emptySubtitleContainer}>
                <Text style={style.emptySubtitle}>
                    {'Parece que tienes todo tu tiempo libre. ¿No crees que podrías ocupar tu tiempo en algo productivo?'}
                </Text>
                </View>
            </View>
        )
    };

    renderItem = ({item}) => {
        return (
            <TodoItem
                id={item}
            />
        )
    };

    renderItemSeparator = () => {
        return null;
    };

    render() {
        const {todoIds} = this.props;

        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title={getDateWithFormat()}
                    />
                    <FlatList
                        data={todoIds}
                        style={style.list}
                        contentContainerStyle={!todoIds.length && style.centerEmptyList}
                        initialNumToRender={10}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        removeClippedSubviews={true}
                        ItemSeparatorComponent={this.renderItemSeparator()}
                        ListEmptyComponent={this.renderEmptyList}
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
    list: {
        marginBottom: 25,
    },
    centerEmptyList: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    emptyImage: {
        height: 200,
        width: 200,
    },
    emptyTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 20,
    },
    emptySubtitleContainer: {
        marginTop: 20,
        width: '80%',
    },
    emptySubtitle: {
        color: '#FFF',
        fontSize: 13,
        opacity: 0.8,
        textAlign: 'justify',
    },
});