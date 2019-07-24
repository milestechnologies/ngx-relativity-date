export type dayResolverFunction = (date: Date) => number;

export interface IDayResolver {
    resolver: dayResolverFunction;
    dayOfTheWeek?: DaysOfTheWeek;
    howManyWeeks?: HowManyWeeks;
}

/**
 * @description interface for a holiday definition which is used to figure out
 * holidays throughout the year
 */
export interface IHolidayDefinition {
    description: string;
    month: number;
    day?: number; // specific day
    dayResolver?: IDayResolver; // how to get the day if not provided
    usesObservanceRules?: boolean; // should holiday observance rules be used
}

/**
 * @enum defines months by name for readability
 */
export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}
/**
 * @enum defines days of the week (Sun-Sat)
 */
export enum DaysOfTheWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
/**
 * @enum defines how many weeks for holidays that depend on day of the week in a certain week
 * instead of a specific date (i.e. Thanksgiving)
 */
export enum HowManyWeeks {
    first,
    second,
    third,
    fourth
}
