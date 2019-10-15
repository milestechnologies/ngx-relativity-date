import { IWorkWeekDefinition } from '../workweek/workweek.library';
import { IHolidayDefinition } from '../holiday/holiday.library.definitions';

export interface IDateModuleConfiguration {
    defaultFormatString?: string;
    workWeek?: IWorkWeekDefinition;
    holidays?: IHolidayDefinition[];
}
