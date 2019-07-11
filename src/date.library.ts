import {
    IDateModuleConfiguration,
    defaultDateModuleConfig
} from './default_configuration';
import * as momentImported from 'moment';
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

    isDuringWorkHours(): boolean {
        let testMoment = this.toMoment();
        if (
            testMoment.hour() >=
                this.config.customWorkWeek[testMoment.weekday()].start &&
            testMoment.hour() <=
                this.config.customWorkWeek[testMoment.weekday()].end
        ) {
            console.log('you should be at work right now!');
            return true;
        } else {
            console.log('take a load off, go home and relax!');
            return false;
        }
    }
}
