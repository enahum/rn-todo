import {connect} from 'react-redux';

import {getPendingTodosCount} from 'app/selectors/todos';

import HomeScreen from './home';

function mapStateToProps(state) {
    return {
        pendingTodosCount: getPendingTodosCount(state),
    };
}

export default connect(mapStateToProps)(HomeScreen);