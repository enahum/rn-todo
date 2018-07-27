import {connect} from 'react-redux';

import {getAllSortedTodoIds} from 'app/selectors/todos';

import TodoScreen from './todos';

function mapStateToProps(state) {
    return {
        todoIds: getAllSortedTodoIds(state),
    };
}

export default connect(mapStateToProps)(TodoScreen);