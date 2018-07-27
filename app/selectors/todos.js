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

export const getAllSortedTodos = createSelector(
    getAllTodos,
    (todos) => todos.sort((t1, t2) => t2.date < t1.date),
);

export const getAllSortedTodoIds = createSelector(
    getAllSortedTodos,
    (todos) => todos.map((t) => t.id),
);