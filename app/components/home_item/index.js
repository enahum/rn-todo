import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ViewPropTypes} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';

export default class HomeItem extends PureComponent {
    static propTypes = {
        color: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        iconName: PropTypes.string.isRequired,
        iconType: PropTypes.string,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        iconColor: '#FFFFFF',
        iconType: 'Ionicons',
    };

    render() {
        const {color, iconColor, iconName, iconType, title, text} = this.props;

        return (
            <View style={[style.container, this.props.style]}>
                <View style={[style.iconContainer, {backgroundColor: color}]}>
                    <Icon
                        name={iconName}
                        type={iconType}
                        style={{color: iconColor}}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Text style={style.title}>
                        {title}
                    </Text>
                    <Text style={style.text}>
                        {text}
                    </Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        height: 40,
        padding: 5,
        marginRight: 15,
        width: 40,
    },
    title: {
        color: '#FFFFFF',
        marginBottom: 7,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600',
    },
});
