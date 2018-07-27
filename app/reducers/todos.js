import {TodoTypes} from 'app/action_types';

const todos = (state = [], action) => {
    switch (action.type) {
    case TodoTypes.ADD_TODO:
        return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false,
                important: action.important,
                notificationId: action.notificationId,
                category: action.category,
                date: action.date,
            }
        ];
    case TodoTypes.REMOVE_TODO:
        return state.filter((todo) => todo.id !== action.id);
    case TodoTypes.TOGGLE_TODO:
        return state.map(todo => {
           if (todo.id === action.id) {
               return {
                   ...todo,
                   completed: !todo.completed,
                   notificationId: todo.notificationId,
               };
           }

           return todo;
        });
    default:
        return state;
    }
};

export default todos;