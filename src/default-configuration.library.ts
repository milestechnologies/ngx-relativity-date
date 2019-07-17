export interface IDateModuleConfiguration {
    defaultFormatString?: string;
    workWeek?: [
        // weekday indexed from 0 -> 6 / Sun -> Sat
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number }
    ];
    holidays?: {
        desc: string;
        month: number;
        day: number;
    }[]; // change to expect Date type
}
export const defaultDateModuleConfig: IDateModuleConfiguration = {
    defaultFormatString: 'dddd, MMMM Do YYYY, h:mm:ss a',
    workWeek: [
        { start: null, end: null },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: null, end: null }
    ],
    holidays: [
        {
            desc: 'New Years Day',
            month: 0,
            day: 1
        },
        {
            desc: 'Martin Luther King, Jr. Day', // changes from year to year
            month: 0,
            day: 21
        },
        {
            desc: 'George Washintons Birthday', // changes from year to year
            month: 1,
            day: 18
        },
        {
            desc: 'Memorial Day', // changes from year to year
            month: 4,
            day: 27
        },
        {
            desc: 'Independence Day',
            month: 6,
            day: 4
        },
        {
            desc: 'Labor Day', // changes from year to year
            month: 8,
            day: 2
        },
        {
            desc: 'Columbus Day', // changes from year to year
            month: 9,
            day: 14
        },
        {
            desc: 'Veterans Day',
            month: 10,
            day: 11
        },
        {
            desc: 'Thanksgiving Day', // changes from year to year
            month: 10,
            day: 28
        },
        {
            desc: 'Christmas Day',
            month: 11,
            day: 25
        }
    ]
};
