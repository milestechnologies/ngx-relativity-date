export interface IDateModuleConfiguration {
    customWorkWeek?: [
        // weekday indexed from 0 -> 6 / Sun -> Sat
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number },
        { start: number; end: number }
    ];
}
export const defaultDateModuleConfig: IDateModuleConfiguration = {
    customWorkWeek: [
        { start: null, end: null },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: 9, end: 17 },
        { start: null, end: null }
    ]
};
