export interface IDateModuleConfiguration {
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
            desc: 'christmas',
            month: 11,
            day: 25
        }
    ]
};
