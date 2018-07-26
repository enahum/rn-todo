import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

export default class ScreenHeader extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        separator: PropTypes.bool,
        titleContainerStyle: ViewPropTypes.style
    };

    static defaultProps = {
        separator: true,
    };

    render() {
        const {title, titleContainerStyle, separator} = this.props;
        return (
            <View style={[style.titleContainer, titleContainerStyle]}>
                <Text style={style.title}>
                    {title}
                </Text>
                {separator &&
                <View style={style.division}/>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    titleContainer: {
        paddingTop: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '600'
    },
    division: {
        height: 1,
        backgroundColor: '#555659',
        marginBottom: 20,
        marginTop: 10
    }
});
