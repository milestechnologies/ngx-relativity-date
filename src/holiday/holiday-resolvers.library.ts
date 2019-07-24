import { IHolidayDefinition } from './holiday.library.definitions';
import { DateParts } from '../date.library';

/**
 * @description used to find a specific day a specific amount of weeks into a month
 * @param date stores the date
 * @returns dayOfHoliday, the date of the holiday
 */
export function anyHolidayResolver(date: Date): number {
    const holiday: IHolidayDefinition = this;
    let dayOfHoliday = getFirstDayOfTheWeekInTheMonth(holiday, date);
    // add 7 for each week beyond the first
    dayOfHoliday += holiday.dayResolver.howManyWeeks * 7; // howManyWeeks is 0 (first) thru 3 (fourth)
    return dayOfHoliday;
}

/**
 * @description calculates the last day of week of the month (i.e. the last tuesday)
 * @param date stores the date
 * @returns the last day of the month as a date
 */
export function lastDayOfTheWeekInTheMonthResolver(date: Date): number {
    const holiday: IHolidayDefinition = this;
    const nextMonth = date.relativityDate.add(1, DateParts.months).date;
    let dayOfHoliday = getFirstDayOfTheWeekInTheMonth(holiday, nextMonth);
    let newDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        dayOfHoliday
    );
    return newDate.relativityDate.subtract(1, DateParts.weeks).date.getDate();
}

/**
 * @description returns first day of the week (i.e. the first thursday of the month) in the month
 * @param holiday definition of the holiday
 * @param date stores the date
 * @returns dayOfHoliday, the date of the first occurence of the weekday
 */
function getFirstDayOfTheWeekInTheMonth(
    holiday: IHolidayDefinition,
    date: Date
): number {
    const dayOfTheWeekForFirstOfTheMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();
    let dayOfHoliday = 1;
    // determine the first instance of day number that meets the dayOfTheWeek criteria
    if (dayOfTheWeekForFirstOfTheMonth !== holiday.dayResolver.dayOfTheWeek) {
        let x =
            holiday.dayResolver.dayOfTheWeek - dayOfTheWeekForFirstOfTheMonth;
        if (x < 0) {
            x += 7;
        }
        dayOfHoliday += x;
    }
    return dayOfHoliday;
}
