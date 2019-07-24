import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RelativityDate } from '../../../../../dist/public_api';

@Component({
    selector: 'app-test',
    templateUrl: './format-switch-demo.component.html'
})
export class FormatSwitchComponent {
    currentDate = new Date();
    newDate: any;

    formSelect = new FormGroup({
        key1: new FormControl('', [Validators.required])
    });
    constructor() {}

    decideFormat(): void {
        const format = this.formSelect.value.key1;

        switch (format) {
            case 'dmy': {
                this.newDate = this.currentDate.relativityDate.format('DD/MM/YYYY');
                return;
            }
            case 'dym': {
                this.newDate = this.currentDate.relativityDate.format('DD/YYYY/MM');
                return;
            }
            case 'ymd': {
                this.newDate = this.currentDate.relativityDate.format('YYYY/MM/DD');
                return;
            }
            case 'ydm': {
                this.newDate = this.currentDate.relativityDate.format('YYYY/DD/MM');
                return;
            }
            case 'mdy': {
                this.newDate = this.currentDate.relativityDate.format('MM/DD/YYYY');
                return;
            }
            case 'myd': {
                this.newDate = this.currentDate.relativityDate.format('MM/YYYY/DD');
                return;
            }
            default: {
                this.newDate = this.currentDate.relativityDate.format('DD/MM/YYYY');
                return;
            }
        }
    }
}
