import { DateParts, RelativityDate } from '../date.library';
import {
    IHolidayDefinition,
    DaysOfTheWeek
} from './holiday.library.definitions';

// isHoliday function returns a string of the holiday name
// if the date object is a holiday and false if it does not
/**
 * @description Compares date against Holidays
 * @returns Description of Holiday if date matches a holiday or false if date does not match holiday
 */
export function isHoliday(): string | boolean {
    const relativityDate: RelativityDate = this;
    for (let holiday of relativityDate.config.holidays) {
        if (holiday.month === relativityDate.date.getMonth()) {
            let instanceOfDay = getInstanceOfDay.bind(relativityDate)(holiday);
            if (instanceOfDay === relativityDate.date.getDate()) {
                return holiday.description;
            }
        }
    }
    return false;
}

// passes in a holiday object
// returns the day that the holiday will be observed on
/**
 * @description checks which day a holiday will fall on and returns the day it will be observed on
 * @param holiday interface which holds the definition of a holiday
 * @returns the day the holiday will be observed on
 */
function getInstanceOfDay(holiday: IHolidayDefinition): number {
    const relativityDate: RelativityDate = this;
    // if property day exists - else dayResolver
    let instanceOfDay = holiday.day
        ? holiday.day
        : holiday.dayResolver.resolver.bind(holiday)(relativityDate.date);
    if (holiday.usesObservanceRules) {
        // apply observance rules
        instanceOfDay = applyObservanceRules.bind(relativityDate)(instanceOfDay);
    }
    return instanceOfDay;
}

// handles only the observance rules
/**
 * @description Handles observance rules should holiday fall on a weekend
 * @param instanceOfDay Day of holiday, is converted to day of week and modified to fall on weekday if needed
 * @returns date after modification, if date falls on weekend, else returns date
 */
function applyObservanceRules(instanceOfDay: number): number {
    const relativityDate: RelativityDate = this;
    let tempDate = new Date(
        relativityDate.date.getFullYear(),
        relativityDate.date.getMonth(),
        instanceOfDay
    );
    if (tempDate.getDay() === DaysOfTheWeek.Saturday) {
        // friday off
        tempDate.relativityDate.subtract(1, DateParts.days);
    }
    if (tempDate.getDay() === DaysOfTheWeek.Sunday) {
        // monday off
        tempDate.relativityDate.add(1, DateParts.days);
    }
    return tempDate.getDate();
}

// determines the next holiday and returns the string from
// calling .to(next occurence of holiday)
export function howLongUntilNextHoliday(): string {
    const relativityDate: RelativityDate = this;
    let retDate = new Date();
    let firstElement = true;
    let nextOcc: Date;
    for (let holiday of relativityDate.config.holidays) {
        nextOcc = getNextOccurenceOfDate.bind(relativityDate)(
            holiday.month,
            holiday.day
        );
        if (firstElement || retDate.relativityDate.isAfterDate(nextOcc)) {
            retDate = nextOcc;
            firstElement = false;
        }
    }
    return relativityDate.to(nextOcc);
}

// build Date obj of the next occurence of the next month/day combination
// after the current day
export function getNextOccurenceOfDate(month: number, day: number): Date {
    const relativityDate: RelativityDate = this;
    let thisMoment = relativityDate.toMoment();
    let this_year = new Date(thisMoment.year(), month, day);
    let next_year = new Date(thisMoment.year() + 1, month, day);
    if (thisMoment.month() < month) {
        return this_year;
    } else {
        if (thisMoment.month() === month && thisMoment.day() < day) {
            return this_year;
        }
    }
    return next_year;
}
