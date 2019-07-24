import { DateParts, MtDate } from '../date.library';
import {
    IHolidayDefinition,
    DaysOfTheWeek
} from './holiday.library.definitions';

// isHoliday function returns a string of the holiday name
// if the date object is a holiday and false if it does not
export function isHoliday(): string | boolean {
    const mtDate: MtDate = this;
    for (let holiday of mtDate.config.holidays) {
        if (holiday.month === mtDate.date.getMonth()) {
            let instanceOfDay = getInstanceOfDay.bind(mtDate)(holiday);
            if (instanceOfDay === mtDate.date.getDate()) {
                return holiday.description;
            }
        }
    }
    return false;
}

// passes in a holiday object
// returns the day that the holiday will be observed on
function getInstanceOfDay(holiday: IHolidayDefinition): number {
    const mtDate: MtDate = this;
    // if property day exists - else dayResolver
    let instanceOfDay = holiday.day
        ? holiday.day
        : holiday.dayResolver.resolver.bind(holiday)(mtDate.date);
    if (holiday.usesObservanceRules) {
        // apply observance rules
        instanceOfDay = applyObservanceRules.bind(mtDate)(instanceOfDay);
    }
    return instanceOfDay;
}

// handles only the observance rules
function applyObservanceRules(instanceOfDay: number): number {
    const mtDate: MtDate = this;
    let tempDate = new Date(
        mtDate.date.getFullYear(),
        mtDate.date.getMonth(),
        instanceOfDay
    );
    if (tempDate.getDay() === DaysOfTheWeek.Saturday) {
        // friday off
        tempDate.mtDate.subtract(1, DateParts.days);
    }
    if (tempDate.getDay() === DaysOfTheWeek.Sunday) {
        // monday off
        tempDate.mtDate.add(1, DateParts.days);
    }
    return tempDate.getDate();
}

// determines the next holiday and returns the string from
// calling .to(next occurence of holiday)
export function howLongUntilNextHoliday(): string {
    const mtDate: MtDate = this;
    let retDate = new Date();
    let firstElement = true;
    let nextOcc: Date;
    for (let holiday of mtDate.config.holidays) {
        nextOcc = getNextOccurenceOfDate.bind(mtDate)(
            holiday.month,
            holiday.day
        );
        if (firstElement || retDate.mtDate.isAfterDate(nextOcc)) {
            retDate = nextOcc;
            firstElement = false;
        }
    }
    return mtDate.to(nextOcc);
}

// build Date obj of the next occurence of the next month/day combination
// after the current day
function getNextOccurenceOfDate(month: number, day: number): Date {
    const mtDate: MtDate = this;
    let thisMoment = mtDate.toMoment();
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
