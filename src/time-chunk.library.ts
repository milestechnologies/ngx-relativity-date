export interface ITimeChunk {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export class TimeChunk implements ITimeChunk {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    // constructor creates an object with 0 for all values
    // if no parameters are passed
    constructor(
        year?: number,
        month?: number,
        day?: number,
        hour?: number,
        minute?: number,
        second?: number,
        millisecond?: number
    ) {
        if (year) {
            this.year = year;
        } else {
            this.year = 0;
        }
        if (month) {
            this.month = month;
        } else {
            this.month = 0;
        }
        if (day) {
            this.day = day;
        } else {
            this.day = 0;
        }
        if (hour) {
            this.hour = hour;
        } else {
            this.hour = 0;
        }
        if (minute) {
            this.minute = minute;
        } else {
            this.minute = 0;
        }
        if (second) {
            this.second = second;
        } else {
            this.second = 0;
        }
        if (millisecond) {
            this.millisecond = millisecond;
        } else {
            this.millisecond = 0;
        }
    }
}
