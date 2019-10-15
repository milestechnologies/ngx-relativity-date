import {
    IHolidayDefinition,
    Months,
    DaysOfTheWeek,
    HowManyWeeks
} from './holiday.library.definitions';
import {
    anyHolidayResolver,
    lastDayOfTheWeekInTheMonthResolver
} from './holiday-resolvers.library';

export class HolidayDefinitions {
    static readonly christmas: IHolidayDefinition = {
        description: 'Christmas Day',
        month: Months.December,
        day: 25,
        usesObservanceRules: true
    };

    static readonly laborDay: IHolidayDefinition = {
        description: 'Labor Day',
        month: Months.September,
        dayResolver: {
            resolver: anyHolidayResolver,
            dayOfTheWeek: DaysOfTheWeek.Monday,
            howManyWeeks: HowManyWeeks.first
        },
        usesObservanceRules: true
    };

    static readonly newYearsDay: IHolidayDefinition = {
        description: 'New Years Day',
        month: Months.January,
        day: 1,
        usesObservanceRules: true
    };

    static readonly martinLutherKingJrDay: IHolidayDefinition = {
        description: 'Martin Luther King Jr. Day',
        month: Months.January,
        dayResolver: {
            resolver: anyHolidayResolver,
            dayOfTheWeek: DaysOfTheWeek.Monday,
            howManyWeeks: HowManyWeeks.third
        },
        usesObservanceRules: true
    };

    static readonly washingtonsBirthday: IHolidayDefinition = {
        description: 'George Washingtons Birthday',
        month: Months.February,
        dayResolver: {
            resolver: anyHolidayResolver,
            dayOfTheWeek: DaysOfTheWeek.Monday,
            howManyWeeks: HowManyWeeks.third
        },
        usesObservanceRules: true
    };

    static readonly independenceDay: IHolidayDefinition = {
        description: 'Independence Day',
        month: Months.July,
        day: 4,
        usesObservanceRules: true
    };

    static readonly columbusDay: IHolidayDefinition = {
        description: 'Columbus Day',
        month: Months.October,
        dayResolver: {
            resolver: anyHolidayResolver,
            dayOfTheWeek: DaysOfTheWeek.Monday,
            howManyWeeks: HowManyWeeks.second
        },
        usesObservanceRules: true
    };

    static readonly veteransDay: IHolidayDefinition = {
        description: 'Veterans Day',
        month: Months.November,
        day: 11,
        usesObservanceRules: true
    };

    static readonly thanksgivingDay: IHolidayDefinition = {
        description: 'Thanksgiving Day',
        month: Months.November,
        dayResolver: {
            resolver: anyHolidayResolver,
            dayOfTheWeek: DaysOfTheWeek.Thursday,
            howManyWeeks: HowManyWeeks.fourth
        }
    };

    static readonly memorialDay: IHolidayDefinition = {
        description: 'Memorial Day',
        month: Months.May,
        dayResolver: {
            resolver: lastDayOfTheWeekInTheMonthResolver,
            dayOfTheWeek: DaysOfTheWeek.Monday
        },
        usesObservanceRules: true
    };
}
