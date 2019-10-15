import { IDateModuleConfiguration } from './relativity-date-config.library';
import { HolidayDefinitions } from '../holiday/default-holidays.library';

export const defaultConfig: IDateModuleConfiguration = {
    defaultFormatString: 'dddd, MMMM Do YYYY, h:mm:ss a',
    workWeek: {
        sunday: { start: null, end: null },
        monday: { start: 9, end: 17 },
        tuesday: { start: 9, end: 17 },
        wednesday: { start: 9, end: 17 },
        thursday: { start: 9, end: 17 },
        friday: { start: 9, end: 17 },
        saturday: { start: null, end: null }
    },
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
