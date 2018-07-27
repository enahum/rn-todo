import React, {PureComponent} from 'react';
import {ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import CategoryItem from 'app/components/category_item';

export default class CategoryList extends PureComponent {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        onSelectCategory: PropTypes.func.isRequired,
        selectedCategory: PropTypes.string,
        itemStyle: ViewPropTypes.style
    };

    getCategoryItem = (data) => {
        const {itemStyle, onSelectCategory, selectedCategory} = this.props;
        const {name} = data;

        return (
            <CategoryItem
                key={name}
                active={name === selectedCategory}
                {...data}
                style={itemStyle}
                onPress={onSelectCategory}
            />
        );
    };

    render() {
        const {categories} = this.props;
        return categories.map((c) => {
            return this.getCategoryItem(c);
        });
    }
}