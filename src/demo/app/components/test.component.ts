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
        let date = new Date().mtDate;
        console.log(date);
        console.log(date.getConfig());

        this.someText =
            date.toMoment().toISOString() + ' :: ' + date.isDuringWorkHours();
    }
}
