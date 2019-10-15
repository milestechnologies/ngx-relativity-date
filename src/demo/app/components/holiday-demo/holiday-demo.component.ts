import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-holiday-demo',
    templateUrl: './holiday-demo.component.html'
})
export class HolidayDemoComponent {
    outputDate: string;
    nextHoliday: string;
    holiday: string | boolean;
    currentDate = new Date();
    form = new FormGroup({
        day: new FormControl('', [Validators.required]),
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required])
    });

    checkHoliday(): void {
        console.log('check holiday');
        const day = this.form.value.day;
        const month = this.form.value.month;
        const year = this.form.value.year;
        const date = new Date(year, month, day);
        this.outputDate = date.relativityDate.format('MM/DD/YYYY');
        this.holiday = date.relativityDate.isHoliday();
        this.nextHoliday = date.relativityDate.howLongUntilNextHoliday();
    }
}
