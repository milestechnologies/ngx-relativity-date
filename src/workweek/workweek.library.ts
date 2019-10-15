import { RelativityDate } from '../relativity-date/relativity-date.library';

/**
 * @interface for work week definition
 */
export interface IWorkWeekDefinition {
    sunday: { start: number; end: number };
    monday: { start: number; end: number };
    tuesday: { start: number; end: number };
    wednesday: { start: number; end: number };
    thursday: { start: number; end: number };
    friday: { start: number; end: number };
    saturday: { start: number; end: number };
}
/**
 * @constant key for weekdays
 */
export const weekdayKey = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

/**
 * @description Checks if the date and time are during work hours
 * @returns boolean, whether this date is within the work hours defined
 * by the config
 */
export function isDuringWorkHours(): boolean {
    const relativityDate: RelativityDate = this;
    let thisMoment = relativityDate.toMoment();
    console.log(relativityDate);
    if (
        thisMoment.hour() >=
            relativityDate.config.workWeek[weekdayKey[thisMoment.weekday()]]
                .start &&
        thisMoment.hour() <=
            relativityDate.config.workWeek[weekdayKey[thisMoment.weekday()]].end
    ) {
        return true;
    } else {
        return false;
    }
}
