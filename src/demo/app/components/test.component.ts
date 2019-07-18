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
        // defaults to now
        let date = new Date();
        // let secondDate = date.mtDate.getNextOccurenceOfDate(11, 25);
        let secondDate = date.mtDate.getNextOccurenceOfDate(8, 4);
        console.log(date);
        console.log(secondDate);
        console.log(secondDate.mtDate.isHoliday());
        // "Sunday, February 14th 2010, 3:25:50 pm" is the moment format of the date
        this.someText =
            date.mtDate.toMoment().format('dddd, MMMM Do YYYY, h:mm:ss a') +
            ' :: ' +
            date.mtDate.isDuringWorkHours();
    }
}
