import {createSelector} from 'reselect';

export function getAllTodos(state) {
    return state.todos;
}

export const getPendingTodosCount = createSelector(
    getAllTodos,
    (todos) => {
        return todos.filter((t) => !t.completed).length;
    }
);