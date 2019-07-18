export type dayResolverFunction = (date: Date) => number;

/**
 * interface for a holiday definition which is used to figure out holidays throughout the year
 */
export interface IHolidayDefinition {
    description: string;
    month: number;
    day?: number; // specific day
    dayResolver?: dayResolverFunction; // how to get the day if not provided
    usesObservanceRules?: boolean; // should holiday observance rules be used
}

/**
 * would be private
 */
export interface IHolidayResolved {
    description: string;
    month: number;
    day: number; // specific day
}

// rules about holiday observance
// if saturday and no work on saturday, then have off Friday
// if sunday and no work on sunday, then have off monday

// rules about how to get day if using dayResolver
// if not have day
// then const day = holiday.dayResolverFunction(this.date)

// map of how to handle
// is Holiday ?
// // get all holidays that match the month
// // // for each get day
// // // // use day resolver if necessary
// // // apply observance rules if necessary
// // // check vs current day
// get next Holday ?
// // get all holidays
// // // for each get day
// // // // use day resolver if necessary
// // // apply observance rules if necessary
// // // sort by month then day
// // // get next

/**
 * everything below this line is what a user would define
 */

export const christmasDefinition: IHolidayDefinition = {
    description: 'Christmas Day',
    month: 12,
    day: 25
};

export function laborDayResolver(date: Date): number {
    // first Monday in Sept
    let y = date.getFullYear();
    return 1;
}

export const laborDayDefinintion: IHolidayDefinition = {
    description: 'Labor Day',
    month: 9,
    dayResolver: laborDayResolver,
    usesObservanceRules: true
};
