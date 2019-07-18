import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-toFrom',
    templateUrl: './to-from.component.html'
})

export class ToFromComponent {
    newDate = new Date();

    tfForm = new FormGroup({
        key1: new FormControl('', [Validators.required]),
        key2: new FormControl('', [Validators.required]),
        key3: new FormControl('', [Validators.required]),
        key4: new FormControl('', [Validators.required]),
    });
    constructor () {}

    toAndFrom(): void {
        if (!this.tfForm.valid) {
            alert('Please Fill Out the Entire Form');
            return;
        }
        const toOrFrom = this.tfForm.value.key1;
        const year = this.tfForm.value.key2;
        const month = this.tfForm.value.key3;
        const day = this.tfForm.value.key4;
        let toFromDate = new Date(year, month, day);
        if (year < 1970 || year > 2100) {
            alert('The year must be between 1970 and 2100');
            return;
        }
        if (day > 31 || day <= 0 ) {
            alert('Invalid Day');
            return;
        }
        if (toOrFrom === 'to') {
                console.log(this.newDate.mtDate.to(toFromDate));
        }
        if (toOrFrom === 'from') {
                console.log(toFromDate.mtDate.to(this.newDate));
        }
    }
}
