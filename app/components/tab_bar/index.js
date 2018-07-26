import React, {PureComponent} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Footer, FooterTab, Button, Icon, Fab} from 'native-base'
import PropTypes from 'prop-types';

const FAB_SIZE = 70;

export default class TabBar extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            fabComputedStyle: this.getFabPositionStyle(Dimensions.get('window')),
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.onDimensionsChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onDimensionsChange);
    }

    getFabPositionStyle = (window) => {
        const {width} = window;

        return {
            right: (width / 2) - (FAB_SIZE/ 2),
            top: -10,
        };
    };

    createTask = () => {
        const {navigation} = this.props;
        navigation.navigate('Create')
    };

    navigateHome = () => {
        const {navigation} = this.props;
        navigation.navigate('Home');
    };

    navigateTasks = () => {
        const {navigation} = this.props;
        navigation.navigate('Tasks');
    };

    onDimensionsChange = ({window}) => {
        const fabComputedStyle = this.getFabPositionStyle(window);
        this.setState({fabComputedStyle});
    };

    render() {
        const {navigation} = this.props;
        const {fabComputedStyle} = this.state;

        let homeStyle = navigation.state.index === 0 ? style.activeTab : null;
        let tasksStyle;
        switch (navigation.state.index) {
        case 0:
            homeStyle = style.activeTab;
            tasksStyle = null;
            break;
        case 1:
            homeStyle = null;
            tasksStyle = style.activeTab;
        }

        return (
            <View>
                <Footer style={[style.footer, style.footerTab]}>
                    <FooterTab style={style.footerTab}>
                        <Button
                            vertical
                            onPress={this.navigateHome}>
                            <Icon
                                type='MaterialIcons'
                                name='apps'
                                style={homeStyle}
                            />
                        </Button>
                        <Button
                            vertical
                            onPress={this.navigateTasks}>
                            <Icon
                                type='Ionicons'
                                name='md-list'
                                style={tasksStyle}
                            />
                        </Button>
                    </FooterTab>
                </Footer>
                <Fab
                    active={false}
                    direction='up'
                    containerStyle={fabComputedStyle}
                    style={style.fab}
                    position='bottomRight'
                    onPress={this.createTask}>
                    <Icon
                        type='MaterialIcons'
                        name='add'
                        style={{
                            fontSize: 40,
                            lineHeight: 40,
                        }}
                    />
                </Fab>
            </View>
        );
    }
}

const style = StyleSheet.create({
    footer: {
        borderTopWidth: 0,
    },
    footerTab: {
        backgroundColor: '#0A1326',
        height: 50,
    },
    activeTab: {
        color: '#FFFFFF',
    },
    fab: {
        backgroundColor: '#18F2BC',
        borderRadius: (FAB_SIZE / 2),
        height: FAB_SIZE,
        width: FAB_SIZE,
    },
});