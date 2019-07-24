import { Component, OnInit } from '@angular/core';
import { Months } from '../../../../dist';

@Component({
    selector: 'app-test',
    template: `
        <h4><em>TestComponent!</em></h4>
        <br />
        <label>is this time during work hours?</label>
        <p>{{ someText }}</p>
    `
})
export class TestComponent implements OnInit {
    someText: string;

    constructor() {}
    // @Inject('config') private config: any

    ngOnInit(): void {
        // defaults to now
        let date = new Date();
        // let secondDate = date.relativityDate.getNextOccurenceOfDate(11, 25);
        let secondDate = date.relativityDate.getNextOccurenceOfDate(Months.May, 25);
        console.log(date);
        console.log(secondDate);
        console.log(secondDate.relativityDate.isHoliday());
        // "Sunday, February 14th 2010, 3:25:50 pm" is the moment format of the date
        this.someText =
            date.relativityDate.toMoment().format('dddd, MMMM Do YYYY, h:mm:ss a') +
            ' :: ' +
            date.relativityDate.isDuringWorkHours();
    }
}
