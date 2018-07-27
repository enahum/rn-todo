import {Notifications} from 'expo';
import {TodoTypes} from 'app/action_types';
import {getTodo} from 'app/selectors/todos';

const NOTIFY_OFFSET = 15 * 1000;

export function createTodo(data, notify) {
    return async (dispatch) => {
        let notificationId;
        if (notify) {
            notificationId = await scheduleNotification(data);
        }

        dispatch({
            type: TodoTypes.ADD_TODO,
            ...data,
            notificationId,
        });
    };
}

export function removeTodo(id) {
    return async (dispatch, getState) => {
        const todo = getTodo(getState(), id);

        if (todo) {
            if (todo.notificationId) {
                Notifications.cancelScheduledNotificationAsync(todo.notificationId);
            }

            dispatch({
                type: TodoTypes.REMOVE_TODO,
                id,
            });
        }
    };
}

export function toggleTodo(id) {
    return async (dispatch, getState) => {
        const todo = getTodo(getState(), id);

        if (todo) {
            const {completed, notificationId} = todo;
            let newNotificationId;

            if (notificationId) {
                if (completed) {
                    Notifications.cancelScheduledNotificationAsync(notificationId);
                } else {
                    newNotificationId = await scheduleNotification(todo);
                }
            }

            dispatch({
                type: TodoTypes.TOGGLE_TODO,
                id,
                notificationId: newNotificationId,
            });
        }
    }
}

async function scheduleNotification(todo) {
    const {text, date} = todo;
    const delta = date - NOTIFY_OFFSET;
    let notificationId;

    if (Date.now() < delta) {
        notificationId = await Notifications.scheduleLocalNotificationAsync({
            title: 'Recordatorio de Tarea',
            body: text,
            data: {
                message: text,
            },
            android: {
                channelId: 'test-notifications'
            }
        }, {
            time: delta
        });
    }

    return notificationId;
}