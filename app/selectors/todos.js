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

export const getTodo = createSelector(
    getAllTodos,
    (state, id) => id,
    (todos, id) => todos.find((t) => t.id === id),
);

export const getAllTodoIds = createSelector(
    getAllTodos,
    (todos) => todos.map((t) => t.id),
);