import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export function getDateWithFormat(date = Date.now()) {
    const dt = moment(date);
    const month = dt.format('MMMM');

    return dt.format(`DD [${month.replace(month[0], month[0].toUpperCase())}], YYYY`);
}

export function getTimeWithFormat(time = Date.now()) {
    return moment(time).format('hh:mm a');
}