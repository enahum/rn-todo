import {TodoTypes} from 'app/action_types';

export function createTodo(data, notify) {
    return {
        type: TodoTypes.ADD_TODO,
        ...data
    };
}