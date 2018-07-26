import moment from 'moment';
import 'moment/locale/es';

export function getCurrentDateWithFormat() {
    const dt = moment();
    moment.locale('es');
    const month = dt.format('MMMM');

    return dt.format(`DD [${month.replace(month[0], month[0].toUpperCase())}], YYYY`);
}