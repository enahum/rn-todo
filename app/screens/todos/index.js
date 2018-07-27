import {connect} from 'react-redux';

import {getAllTodoIds} from 'app/selectors/todos';

import TodoScreen from './todos';

function mapStateToProps(state) {
    return {
        todoIds: getAllTodoIds(state),
    };
}

export default connect(mapStateToProps)(TodoScreen);