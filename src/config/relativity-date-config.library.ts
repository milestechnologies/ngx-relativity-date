import { IHolidayDefinition } from '../holiday/holiday.library.definitions';

export interface IDateModuleConfiguration {
    defaultFormatString?: string;
    holidays?: IHolidayDefinition[];
}
