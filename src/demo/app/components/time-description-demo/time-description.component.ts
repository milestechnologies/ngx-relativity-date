import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RelativityDate } from '../../../../../dist';

@Component({
    selector: 'app-test',
    templateUrl: './time-description.component.html'
})
export class TimeDescriptionComponent implements OnInit {
    outputArr: { date: string; priority: string; desc: string }[];
    dateObject: RelativityDate;
    createEvent = new FormGroup({
        key1: new FormControl('', [Validators.required]),
        key2: new FormControl('', [Validators.required]),
        key3: new FormControl('', [Validators.required]),
        key4: new FormControl('', [Validators.required]),
        key5: new FormControl('', [Validators.required])
    });
    ngOnInit(): void {
        this.outputArr = [];
    }
    setEvent(): void {
        const month = this.createEvent.value.key1;
        const day = this.createEvent.value.key2;
        const year = this.createEvent.value.key3;
        const description = this.createEvent.value.key4;
        const priority = this.createEvent.value.key5;

        const newDate = new Date(year, month, day);
        this.outputArr.push({
            date: newDate.relativityDate.format('MM/DD/YYYY').toString(),
            desc: description,
            priority: priority
        });
    }

    checkInfo(): void {
        console.log();
    }
}
