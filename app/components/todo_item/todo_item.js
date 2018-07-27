import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import CategoryItem from 'app/components/category_item';

export default class TodoScreen extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            removeTodo: PropTypes.func.isRequired,
            toggleTodo: PropTypes.func.isRequired,
        }).isRequired,
        category: PropTypes.object.isRequired,
        todo: PropTypes.object.isRequired,
    };

    render() {
        return (
            <CategoryItem
                {...this.props.category}
            />
        );
    }
}

const style = StyleSheet.create({

});