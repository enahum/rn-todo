import {Notifications} from 'expo';
import {TodoTypes} from 'app/action_types';

const NOTIFY_OFFSET = 15 * 1000;

export function createTodo(data, notify) {
    return async (dispatch) => {
        let notificationId;
        if (notify) {
            notificationId = await Notifications.scheduleLocalNotificationAsync({
                title: 'Recordatorio de Tarea',
                body: data.text,
                data: {
                    message: data.text,
                },
                android: {
                    channelId: 'test-notifications'
                }
            }, {
                time: data.date - NOTIFY_OFFSET
            });
        }
        dispatch({
            type: TodoTypes.ADD_TODO,
            ...data,
            notificationId,
        });
    };
}