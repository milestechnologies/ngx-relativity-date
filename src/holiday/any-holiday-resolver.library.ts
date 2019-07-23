import { IHolidayDefinition } from './holiday.library.definitions';

export function anyHolidayResolver(date: Date): number {
    const holiday: IHolidayDefinition = this;
    const dayOfTheWeekForFirstOfTheMonth = new Date(
        date.getFullYear(),
        holiday.month,
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
    // add 7 for each week beyond the first
    dayOfHoliday += holiday.dayResolver.howManyWeeks * 7; // howManyWeeks is 0 (first) thru 3 (fourth)
    return dayOfHoliday;
}
