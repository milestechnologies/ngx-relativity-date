import { Component, OnInit } from '@angular/core';

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
        let date = new Date();
        console.log(date);
        console.log(date.mtDate.getConfig());
        console.log(date.mtDate.getNextOccurenceOfDate(3, 25));
        console.log(date.mtDate.howLongUntilNextHoliday());
        // "Sunday, February 14th 2010, 3:25:50 pm" is the moment format of the date
        this.someText =
            date.mtDate.toMoment().format('dddd, MMMM Do YYYY, h:mm:ss a') +
            ' :: ' +
            date.mtDate.isDuringWorkHours();
    }
}
