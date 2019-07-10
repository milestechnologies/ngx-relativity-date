import { Component, OnInit } from '@angular/core';
import { MtDate } from '../../../date.library';
// import * as moment from 'moment';

@Component({
    selector: 'app-test',
    template: `
        <h4><em>TestComponent!</em></h4>
        {{ someText }}
    `
})
export class TestComponent implements OnInit {
    someText: string;

    constructor() {}

    ngOnInit(): void {
        let date = new MtDate();
        console.log(date);
        this.someText = date.toMoment().toISOString();
    }
}
