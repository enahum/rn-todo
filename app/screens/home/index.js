import React, {PureComponent} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Constants} from 'expo';

import HomeItem from 'app/components/home_item';
import ScreenHeader from 'app/components/screen_header';
import {getCurrentDateWithFormat} from 'app/utils/helpers';

export default class HomeScreen extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        pendingTasksCount: PropTypes.number,
    };

    static defaultProps = {
        pendingTasksCount: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            weather: 'N/A',
            location: 'N/A',
            loading: true,
        }
    }

    componentDidMount() {
        this.getLocationAndWeather();
    }

    fetchWeather(lat, lon) {
        const API_KEY = '849338767c0e95025b5559533d26b7c4';
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;

        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                weather: `${Math.round(json.main.temp)} °C`,
                location: `${json.name}, ${json.sys.country}`,
                loading: false,
            });
        });
    }

    getLocationAndWeather = () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                weather: 'N/A',
                location: 'N/A',
                loading: false,
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    this.setState({
                        weather: 'N/A',
                        location: 'N/A',
                        loading: false,
                    });
                }
            );
        }
    };

    getWelcomePrompt = () => {
        const hrs = new Date().getHours();

        if (hrs < 12) {
            return 'Buenos días';
        } else if (hrs >= 12 && hrs <= 20) {
            return 'Buenas tardes';
        } else {
            return 'Buenas noches'
        }
    };

    render() {
        const {pendingTasksCount} = this.props;
        const {loading, location, weather} = this.state;
        return (
            <SafeAreaView style={style.safeArea}>
                <View style={style.container}>
                    <ScreenHeader
                        title={this.getWelcomePrompt()}
                    />
                    <HomeItem
                        color='#7318f2'
                        iconName='timer-sand'
                        iconType='MaterialCommunityIcons'
                        title='Fecha Actual'
                        text={getCurrentDateWithFormat()}
                        style={style.blankSpace}
                    />
                    <HomeItem
                        color='#f3bc19'
                        iconName='map-marker'
                        iconType='FontAwesome'
                        title='Ubicación Actual'
                        text={loading ? 'Cargando...' : location}
                        style={style.blankSpace}
                    />
                    <HomeItem
                        color='#18bcf3'
                        iconName='md-sunny'
                        title='Temperatura en tu área'
                        text={loading ? 'Cargando...' : weather}
                        style={style.blankSpace}
                    />
                    <View style={style.pendingContainer}>
                        <Text style={style.pendingTitle}>
                            {'Tareas pendientes por completar'}
                        </Text>
                        <Text style={style.pending}>
                            {pendingTasksCount}
                        </Text>
                    </View>
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
    blankSpace: {
        marginBottom: 30,
    },
    pendingContainer: {
        alignItems: 'center',
        flex: 1,
        marginVertical: 30,
    },
    pendingTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 20
    },
    pending: {
        color: '#FFFFFF',
        fontSize: 90,
        fontWeight: '600',
    },
});