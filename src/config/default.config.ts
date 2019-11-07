import { IDateModuleConfiguration } from './relativity-date-config.library';
import { HolidayDefinitions } from '../holiday/default-holidays.library';

export const defaultConfig: IDateModuleConfiguration = {
    defaultFormatString: 'dddd, MMMM Do YYYY, h:mm:ss a',
    holidays: [
        HolidayDefinitions.christmas,
        HolidayDefinitions.laborDay,
        HolidayDefinitions.newYearsDay,
        HolidayDefinitions.martinLutherKingJrDay,
        HolidayDefinitions.washingtonsBirthday,
        HolidayDefinitions.independenceDay,
        HolidayDefinitions.columbusDay,
        HolidayDefinitions.veteransDay,
        HolidayDefinitions.thanksgivingDay,
        HolidayDefinitions.memorialDay
    ]
};
