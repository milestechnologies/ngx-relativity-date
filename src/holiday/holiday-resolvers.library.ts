import { IHolidayDefinition } from './holiday.library.definitions';
import { DateParts } from '../date.library';

export function anyHolidayResolver(date: Date): number {
    const holiday: IHolidayDefinition = this;
    let dayOfHoliday = getFirstDayOfTheWeekInTheMonth(holiday, date);
    // add 7 for each week beyond the first
    dayOfHoliday += holiday.dayResolver.howManyWeeks * 7; // howManyWeeks is 0 (first) thru 3 (fourth)
    return dayOfHoliday;
}

export function lastDayOfTheWeekInTheMonthResolver(date: Date): number {
    const holiday: IHolidayDefinition = this;
    const nextMonth = date.mtDate.add(1, DateParts.months).date;
    let dayOfHoliday = getFirstDayOfTheWeekInTheMonth(holiday, nextMonth);
    let newDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        dayOfHoliday
    );
    return newDate.mtDate.subtract(1, DateParts.weeks).date.getDate();
}

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
