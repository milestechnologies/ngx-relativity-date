import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-test',
    templateUrl: './simple-date-retrieval.component.html'
})
export class SimpleDateRetrievalComponent {
    dateRetrieval: string;
    constructor() {}

    ngOnInit(): void {
        this.dateRetrieval = `
moment(new Date()).format('MM/DD/YYYY')`;
    }

    alertMessage(): void {
        alert(
            'Todays date is ' + moment(new Date()).format('MM/DD/YYYY/') + '!'
        );
    }
}
