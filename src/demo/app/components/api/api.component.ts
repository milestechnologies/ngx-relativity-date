import { Component } from '@angular/core';
import { DateParts } from '../../../../../src/public_api';
import { toDate } from '@angular/common/src/i18n/format_date';

export interface IEndPoint {
    code: string;
    result: string;
}

@Component({
    templateUrl: './api.component.html'
})
export class APIComponent {
    apiEndPoints: IEndPoint[] = [];

    constructor() {
        let now = new Date();

        // Format Date. Do we want to do a whole thing on formatting, or just reference moment?
        let formattedDate = now.relativityDate.format('LL');
        this.apiEndPoints.push({code: "now.relativityDate.format('LL');", result: formattedDate});
        // Add Day
        now.relativityDate.add(10, DateParts.days);
        this.apiEndPoints.push({code: 'now.relativityDate.add(10, DateParts.days);',  result: now.toString()});
        // Subtract Day
        now.relativityDate.subtract(5, DateParts.days);
        this.apiEndPoints.push({code: 'now.relativityDate.subtract(5, DateParts.days);', result: now.toString()});
        // Dis no work :(
        let nxtHoliday = now.relativityDate.howLongUntilNextHoliday();
        this.apiEndPoints.push({code: 'let nxtHoliday = now.relativityDate.howLongUntilNextHoliday();', result: nxtHoliday});
        // Is During Work Hours
        let isDuringWorkHrs = now.relativityDate.isDuringWorkHours();
        this.apiEndPoints.push({code: 'let isDuringWorkHrs = now.relativityDate.isDuringWorkHours();', result: isDuringWorkHrs.toString()});
    
        
    }
}
