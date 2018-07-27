import React, {PureComponent, Fragment} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {getDateWithFormat, getTimeWithFormat} from 'app/utils/helpers';

export default class DateItem extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['date', 'time']).isRequired,
        timestamp: PropTypes.number.isRequired,
        onSelected: PropTypes.func.isRequired,
        separator: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    hideDateTimePicker = () => {
        this.setState({visible: false});
    };

    showDateTimePicker = () => {
        this.setState({visible: true});
    };

    handleDatePicked = (date) => {
        this.props.onSelected(date);
        this.hideDateTimePicker();
    };

    render() {
        const {label, timestamp, type, separator} = this.props;
        const {visible} = this.state;

        let formatFunction;
        switch (type) {
        case 'time':
            formatFunction = getTimeWithFormat;
            break;
        default:
            formatFunction = getDateWithFormat;
            break;
        }

        return (
            <Fragment>
                <View style={style.dateSectionContainer}>
                    <View style={style.dateTitleContainer}>
                        <Text style={style.dateTitle}>
                            {label}
                        </Text>
                    </View>
                    <View style={style.dateOptionContainer}>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                        <Text style={style.dateOption}>
                            {formatFunction(timestamp)}
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {separator && <View style={style.separator}/>}
                <DateTimePicker
                    date={new Date(timestamp)}
                    mode={type}
                    isVisible={visible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />

            </Fragment>
        );
    }
}

const style = StyleSheet.create({
    separator: {
        backgroundColor: '#a4a4a4',
        height: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    dateSectionContainer: {
        flexDirection: 'row',
    },
    dateTitleContainer: {
        flex: 1,
    },
    dateTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    dateOptionContainer: {
        alignItems: 'flex-end',
    },
    dateOption: {
        color: '#a4a4a4',
        fontSize: 17,
        fontWeight: '400',
    },
});