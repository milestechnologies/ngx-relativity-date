import { Component } from '@angular/core';
import { DateParts } from '../../../../../src/public_api';
import { toDate } from '@angular/common/src/i18n/format_date';
import { TimeChunk } from '../../../../../dist/public_api';

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
        this.apiEndPoints.push({code: 'let now = new Date();', result: now.toString()});
        let tomorrow = new Date();
        // Format Date.
        let formattedDate = now.relativityDate.format('LT');
        this.apiEndPoints.push({code: "now.relativityDate.format('LT');", result: formattedDate});
        formattedDate = now.relativityDate.format('LTS');
        this.apiEndPoints.push({code: "now.relativityDate.format('LTS');", result: formattedDate});
        formattedDate = now.relativityDate.format('L');
        this.apiEndPoints.push({code: "now.relativityDate.format('L');", result: formattedDate});
        formattedDate = now.relativityDate.format('l');
        this.apiEndPoints.push({code: "now.relativityDate.format('l');", result: formattedDate});
        formattedDate = now.relativityDate.format('LL');
        this.apiEndPoints.push({code: "now.relativityDate.format('LL');", result: formattedDate});
        formattedDate = now.relativityDate.format('ll');
        this.apiEndPoints.push({code: "now.relativityDate.format('ll');", result: formattedDate});
        formattedDate = now.relativityDate.format('LLL');
        this.apiEndPoints.push({code: "now.relativityDate.format('LLL');", result: formattedDate});
        formattedDate = now.relativityDate.format('lll');
        this.apiEndPoints.push({code: "now.relativityDate.format('lll');", result: formattedDate});
        formattedDate = now.relativityDate.format('LLLL');
        this.apiEndPoints.push({code: "now.relativityDate.format('LLLL');", result: formattedDate});
        formattedDate = now.relativityDate.format('llll');
        this.apiEndPoints.push({code: "now.relativityDate.format('llll');", result: formattedDate});
        // Is Before
        tomorrow.relativityDate.add(1, DateParts.days);
        let isBefore = now.relativityDate.isBeforeDate(tomorrow);
        this.apiEndPoints.push({code: 'now.relativityDate.isBeforeDate(tomorrow);', result: isBefore.toString()});
        // Is After
        let isAfter = now.relativityDate.isAfterDate(tomorrow);
        this.apiEndPoints.push({code: 'now.relativityDate.isAfterDate(tomorrow);', result: isAfter.toString()});
        // Add Day
        now.relativityDate.add(10, DateParts.days);
        this.apiEndPoints.push({code: 'now.relativityDate.add(10, DateParts.days);',  result: now.toString()});
        // Subtract Day
        now.relativityDate.subtract(5, DateParts.days);
        this.apiEndPoints.push({code: 'now.relativityDate.subtract(5, DateParts.days);', result: now.toString()});
        // Dis no work :(
        let nxtHoliday = now.relativityDate.howLongUntilNextHoliday();
        this.apiEndPoints.push({code: 'now.relativityDate.howLongUntilNextHoliday();', result: nxtHoliday});
        // Is During Work Hours
        let isDuringWorkHrs = now.relativityDate.isDuringWorkHours();
        this.apiEndPoints.push({code: 'now.relativityDate.isDuringWorkHours();', result: isDuringWorkHrs.toString()});
        // // Is Holiday Dis also no work :(
        // let isHoliday = now.RelativityDate.isHoliday();
        // this.apiEndPoints.push({code: 'let isHoliday = now.RelativityDate.isHoliday();', result: isHoliday.toString()});
    }
}
