import {
    IDateModuleConfiguration,
    defaultDateModuleConfig
} from './default-configuration.library';
import * as momentImported from 'moment';
import { TimeChunk } from './time-chunk.library';
import {
    isHoliday,
    howLongUntilNextHoliday,
    getNextOccurenceOfDate
} from './holiday/holiday.library';
import { isDuringWorkHours } from './workweek/workweek.library';
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

export interface IRelativityDate {
    date: Date;
    add(amount: number, part: DateParts): RelativityDate;
    subtract(amount: number, part: DateParts): RelativityDate;
    format(tokenString?: string): string;
    from(date?: Date): string;
    to(date?: Date): string;
    toMoment(): momentImported.Moment;
}

export class RelativityDate implements IRelativityDate {
    date: Date;
    config: IDateModuleConfiguration;

    /**
     * Create an RelativityDate object
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

    /**
     *  @returns the configuration object of this RelativityDate
     */
    getConfig(): any {
        return this.config;
    }

    /**
     * Add to the relativityDate value using a specified datePart.
     * @param amount integer amount to add.
     * @param part date part enumerator specifying which part of the date to add to.
     */
    add(amount: number, part: DateParts): RelativityDate {
        const date = moment(this.date)
            .add(amount, this.getMomentDatePart(part))
            .toDate();
        this.setThisDate(date);
        return this;
    }

    /**
     * Subtract from the relativityDate value using a specified datePart.
     * @param amount integer amount to subtract.
     * @param part date part enumerator specifying which part of the date to subtract from.
     */
    subtract(amount: number, part: DateParts): RelativityDate {
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
     * Get a string reprensentation of the relativityDate.
     * @param tokenString string including tokens that will be replaced with date parts.
     * Defaults to 'YYYY-MM-DDTHH:mm:ssZ'.
     * documented here https://momentjs.com/docs/#/displaying/format/
     */
    format(tokenString?: string): string {
        if (!tokenString) {
            return moment(this.date).format(
                defaultDateModuleConfig.defaultFormatString
            );
        }
        return moment(this.date).format(tokenString);
    }

    /**
     * Get a string representing the time from the date param to the relativityDate.
     * @param date the date to start from when comparing the relativityDate.  Defaults to now.
     */
    from(date?: Date): string {
        if (!date) {
            date = new Date();
        }
        return moment(this.date).from(moment(date));
    }

    /**
     * Get a string representing the time from the relativityDate to the date param.
     * @param date the date to end at when comparing the relativityDate.  Defaults to now.
     */
    to(date?: Date): string {
        if (!date) {
            date = new Date();
        }
        return moment(this.date).to(moment(date));
    }

    /**
     * Provide the relativityDate as a Moment object with all of the moment
     * library functions accessible.  Will have no reference back to the relativityDate object.
     * Moment documentation here http://momentjs.com/docs/
     */
    toMoment(): momentImported.Moment {
        return moment(this.date);
    }

    /**
     * @description Checks against date object to see which date came first
     * @param date holds a date object
     * @returns whether the date was before
     */
    isBeforeDate(date: Date): boolean {
        return this.toMoment().diff(date.relativityDate.toMoment()) < 0;
    }
    /**
     * @description Checks against date object to see which date came first
     * @param date holds a date object
     * @returns whether the date was after
     */
    isAfterDate(date: Date): boolean {
        return this.toMoment().diff(date.relativityDate.toMoment()) > 0;
    }

    /**
     * @description referencing function in workweek library
     * @returns boolean, whether this date is within the work hours defined
     * by the config
     */
    isDuringWorkHours(): boolean {
        return isDuringWorkHours.bind(this)();
    }

    /**
     * @description referencing function in holiday library
     * @returns Description of Holiday if date matches a holiday or false if date does not match holiday
     */
    isHoliday(): string | boolean {
        return isHoliday.bind(this)();
    }

    /**
     * @description referencing function in holiday library
     * @returns returns the string from calling .to(next occurence of holiday)
     */
    howLongUntilNextHoliday(): string {
        return howLongUntilNextHoliday.bind(this)();
    }

    /**
     * @description referencing function in holiday library
     * @param month month value passed in
     * @param day day value passed in
     * @returns next instance of the day/month combo
     */
    getNextOccurenceOfDate(month: number, day: number): Date {
        return getNextOccurenceOfDate.bind(this)(month, day);
    }

    /**
     * @description designed to one-line adding/subtracting multiple date parts / value
     * to a date obj
     * @param data passed in TimeChunk
     * @returns result of adding time chunk to date
     */
    addFullDate(data: TimeChunk): RelativityDate {
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
    /**
     * @description designed to one-line adding/subtracting multiple date parts / value
     * to a date obj
     * @param data passed in TimeChunk
     * @returns result of subtracting TimeChunk from date
     */
    subtractFullDate(data: TimeChunk): RelativityDate {
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
