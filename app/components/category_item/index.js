import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';

export default class CategoryItem extends PureComponent {
    static propTypes = {
        active: PropTypes.bool,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        iconType: PropTypes.string,
        onPress: PropTypes.func,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        iconType: 'Ionicons',
    };

    handlePress = () => {
        const {name, onPress} = this.props;
        onPress(name);
    };

    render() {
        const {
            active,
            name,
            color,
            icon,
            iconType,
            onPress,
            style,
        } = this.props;

        let activeColor = '#a4a4a4';
        if (active) {
            activeColor = color;
        }

        const categoryElement = (
            <View style={[styles.container, style]}>
                <Icon
                    name={icon}
                    type={iconType}
                    style={{color: activeColor, fontSize: 19}}
                />
                <Text style={[styles.category, {color: activeColor}]}>
                    {name.toUpperCase()}
                </Text>
            </View>
        );

        if (onPress) {
            return (
                <TouchableOpacity onPress={this.handlePress}>
                    {categoryElement}
                </TouchableOpacity>
            );
        }

        return categoryElement;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    category: {
        ...Platform.select({
            android: {
                top: 2,
            },
            ios: {
                top: -2,
            }
        }),
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600'
    }
});