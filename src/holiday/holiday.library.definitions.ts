export type dayResolverFunction = (date: Date) => number;

export interface IDayResolver {
    resolver: dayResolverFunction;
    dayOfTheWeek?: DaysOfTheWeek;
    howManyWeeks?: HowManyWeeks;
}

/**
 * interface for a holiday definition which is used to figure out
 * holidays throughout the year
 */
export interface IHolidayDefinition {
    description: string;
    month: number;
    day?: number; // specific day
    dayResolver?: IDayResolver; // how to get the day if not provided
    usesObservanceRules?: boolean; // should holiday observance rules be used
}

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

export enum DaysOfTheWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum HowManyWeeks {
    first,
    second,
    third,
    fourth
}
