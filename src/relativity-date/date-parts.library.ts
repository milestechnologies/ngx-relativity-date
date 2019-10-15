export enum DateParts {
    years,
    quarters,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
}

export type momentDatePart =
    | 'y'
    | 'Q'
    | 'M'
    | 'w'
    | 'd'
    | 'h'
    | 'm'
    | 's'
    | 'ms';
