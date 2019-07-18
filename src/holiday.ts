export type dayResolverFunction = (date: Date) => number;

export interface IHolidayDefinition {
    description: string;
    month: number;
    day?: number;
    dayResolver?: dayResolverFunction;
}

// if not have day
// then const day = holiday.dayResolverFunction(this.date)

/**
 * everything below this line is what a user would define
 */

export const christmasDefinition: IHolidayDefinition = {
    description: 'Christmas',
    month: 12,
    day: 25,
};

export function laborDayResolover(date: Date): number {
    date.getFullYear();
    return 4;
}

export const laborDayDefinintion: IHolidayDefinition = {
    description: 'Labor',
    month: 4,
    dayResolver: laborDayResolover,
};
