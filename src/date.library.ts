import {
    IDateModuleConfiguration,
    defaultDateModuleConfig
} from './default-configuration.library';
import * as momentImported from 'moment';
import { TimeChunk } from './time-chunk.library';
const moment = momentImported;

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

type momentDatePart = 'y' | 'Q' | 'M' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms';

export interface IMtDate {
    date: Date;
    add(amount: number, part: DateParts): MtDate;
    subtract(amount: number, part: DateParts): MtDate;
    format(tokenString?: string): string;
    from(date?: Date): string;
    to(date?: Date): string;
    toMoment(): momentImported.Moment;
}

export class MtDate implements IMtDate {
    date: Date;
    config: IDateModuleConfiguration;

    /**
     * Create an MtDate object
     * @param dateParam the date object to use for the initial value.  Defaults to now.
     * @param asReference boolean flag indicating whether the dateParam should be handled
     * as a reference object.  Defaults to false.
     */
    constructor(
        dateParam?: Date,
        asReference = false,
        customConfig?: IDateModuleConfiguration
    ) {
        let dateValue: Date;
        if (!dateParam) {
            dateValue = new Date();
        }
        if (!asReference) {
            dateValue = new Date(dateParam);
        } else {
            dateValue = dateParam;
        }
        this.date = dateValue;
        if (customConfig) {
            this.config = customConfig;
        } else {
            this.config = defaultDateModuleConfig;
        }
    }

    // returns the configuration object of this MtDate
    getConfig(): any {
        return this.config;
    }

    /**
     * Add to the mtDate value using a specified datePart.
     * @param amount integer amount to add.
     * @param part date part enumerator specifying which part of the date to add to.
     */
    add(amount: number, part: DateParts): MtDate {
        const date = moment(this.date)
            .add(amount, this.getMomentDatePart(part))
            .toDate();
        this.setThisDate(date);
        return this;
    }

    /**
     * Subtract from the mtDate value using a specified datePart.
     * @param amount integer amount to subtract.
     * @param part date part enumerator specifying which part of the date to subtract from.
     */
    subtract(amount: number, part: DateParts): MtDate {
        const date = moment(this.date)
            .subtract(amount, this.getMomentDatePart(part))
            .toDate();
        this.setThisDate(date);
        return this;
    }

    private setThisDate(date: Date): void {
        this.date.setFullYear(date.getFullYear());
        this.date.setMonth(date.getMonth());
        this.date.setDate(date.getDate());
        this.date.setHours(date.getHours());
        this.date.setMinutes(date.getMinutes());
        this.date.setSeconds(date.getSeconds());
        this.date.setMilliseconds(date.getMilliseconds());
    }

    private getMomentDatePart(part: DateParts): momentDatePart {
        switch (part) {
            case DateParts.years:
                return 'y';
            case DateParts.quarters:
                return 'Q';
            case DateParts.months:
                return 'M';
            case DateParts.weeks:
                return 'w';
            case DateParts.days:
                return 'd';
            case DateParts.hours:
                return 'h';
            case DateParts.minutes:
                return 'm';
            case DateParts.seconds:
                return 's';
            case DateParts.milliseconds:
                return 'ms';
            default:
                return 'd';
        }
    }

    /**
     * Get a string reprensentation of the mtDate.
     * @param tokenString string including tokens that will be replaced with date parts.
     * Defaults to 'YYYY-MM-DDTHH:mm:ssZ'.
     * documented here https://momentjs.com/docs/#/displaying/format/
     */
    format(tokenString?: string): string {
        if (!tokenString) {
            return moment(this.date).format();
        }
        return moment(this.date).format(tokenString);
    }

    /**
     * Get a string representing the time from the date param to the mtDate.
     * @param date the date to start from when comparing the mtDate.  Defaults to now.
     */
    from(date?: Date): string {
        if (!date) {
            date = new Date();
        }
        return moment(this.date).from(moment(date));
    }

    /**
     * Get a string representing the time from the mtDate to the date param.
     * @param date the date to end at when comparing the mtDate.  Defaults to now.
     */
    to(date?: Date): string {
        if (!date) {
            date = new Date();
        }
        return moment(this.date).to(moment(date));
    }

    /**
     * Provide the mtDate as a Moment object with all of the moment
     * library functions accessible.  Will have no reference back to the mtDate object.
     * Moment documentation here http://momentjs.com/docs/
     */
    toMoment(): momentImported.Moment {
        return moment(this.date);
    }

    // helper functions to allow us to quickly check against the date
    // object to see which date comes first
    isBeforeDate(date: Date): boolean {
        return this.toMoment().diff(date.mtDate.toMoment()) < 0;
    }
    isAfterDate(date: Date): boolean {
        return this.toMoment().diff(date.mtDate.toMoment()) > 0;
    }

    // returns whether this date is within the work hours defined
    // by the config
    isDuringWorkHours(): boolean {
        let thisMoment = this.toMoment();
        if (
            thisMoment.hour() >=
                this.config.workWeek[thisMoment.weekday()].start &&
            thisMoment.hour() <= this.config.workWeek[thisMoment.weekday()].end
        ) {
            // console.log('you should be at work right now!');
            return true;
        } else {
            // console.log('take a load off, go home and relax!');
            return false;
        }
    }

    // determines the next holiday and returns the string from
    // calling .to(next occurence of holiday)
    howLongUntilNextHoliday(): string {
        let retDate = new Date();
        let firstElement = true;
        let nextOcc: Date;
        for (let holiday of this.config.holidays) {
            nextOcc = this.getNextOccurenceOfDate(holiday.month, holiday.day);
            if (firstElement || retDate.mtDate.isAfterDate(nextOcc)) {
                retDate = nextOcc;
                firstElement = false;
            }
        }
        return this.to(nextOcc);
    }

    // build Date obj of the next occurence of the next month/day combination
    // after the current day
    getNextOccurenceOfDate(month: number, day: number): Date {
        let thisMoment = this.toMoment();
        let this_year = new Date(thisMoment.year(), month, day);
        let next_year = new Date(thisMoment.year() + 1, month, day);
        // console.log(this_year);
        // console.log(next_year);
        if (thisMoment.month() < month) {
            return this_year;
        } else {
            if (thisMoment.month() === month && thisMoment.day() < day) {
                return this_year;
            }
        }
        return next_year;
    }

    // designed to one-line adding/subtracting multiple date parts / values
    // to a date obj
    addFullDate(data: TimeChunk): MtDate {
        if (data.year !== null && data.year !== 0) {
            this.add(data.year, DateParts.years);
        }
        if (data.month !== null && data.month !== 0) {
            this.add(data.month, DateParts.months);
        }
        if (data.day !== null && data.day !== 0) {
            this.add(data.day, DateParts.days);
        }
        if (data.hour !== null && data.hour !== 0) {
            this.add(data.hour, DateParts.hours);
        }
        if (data.minute !== null && data.minute !== 0) {
            this.add(data.minute, DateParts.minutes);
        }
        if (data.second !== null && data.second !== 0) {
            this.add(data.second, DateParts.seconds);
        }
        if (data.millisecond !== null && data.millisecond !== 0) {
            this.add(data.millisecond, DateParts.milliseconds);
        }
        return this;
    }
    subtractFullDate(data: TimeChunk): MtDate {
        if (data.year !== null && data.year !== 0) {
            this.subtract(data.year, DateParts.years);
        }
        if (data.month !== null && data.month !== 0) {
            this.subtract(data.month, DateParts.months);
        }
        if (data.day !== null && data.day !== 0) {
            this.subtract(data.day, DateParts.days);
        }
        if (data.hour !== null && data.hour !== 0) {
            this.subtract(data.hour, DateParts.hours);
        }
        if (data.minute !== null && data.minute !== 0) {
            this.subtract(data.minute, DateParts.minutes);
        }
        if (data.second !== null && data.second !== 0) {
            this.subtract(data.second, DateParts.seconds);
        }
        if (data.millisecond !== null && data.millisecond !== 0) {
            this.subtract(data.millisecond, DateParts.milliseconds);
        }
        return this;
    }
}
