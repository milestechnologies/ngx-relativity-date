import { Component, OnInit, Inject } from '@angular/core';
import { NgxDateModule, MtDate } from '../../../../dist';
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
    // @Inject('config') private config: any

    ngOnInit(): void {
        let date = new Date();
        console.log(date);
        this.someText = date.mtDate.toMoment().toISOString();

        console.log(date.mtDate.getConfig());
    }
}
