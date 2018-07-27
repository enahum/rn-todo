import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {removeTodo, toggleTodo} from 'app/actions/todos';
import {getCategoryByName} from 'app/selectors/categories';
import {getTodo} from 'app/selectors/todos';

import TodoItem from './todo_item';

function mapStateToProps(state, ownProps) {
    const todo = getTodo(state, ownProps.id);

    return {
        todo,
        category: todo ? getCategoryByName(state, todo.category) : '',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleTodo,
            removeTodo,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);