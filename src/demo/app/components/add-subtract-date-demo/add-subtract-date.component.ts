import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-test',
    templateUrl: './add-subtract-date.component.html'
})
export class AddSubtractDateComponent {
    //controls adding to date
    currentDate = new Date();
    addSubSelect = new FormGroup({
        key1: new FormControl('', [Validators.required])
    });
    enumForm = new FormGroup({
        key2: new FormControl('', [Validators.required])
    });
    quantityForm = new FormGroup({
        key3: new FormControl('', [Validators.required])
    });

    //controls adding to time
    currentTime = new Date();
    addSubTimeSelect = new FormGroup({
        keyTime1: new FormControl('', [Validators.required])
    });
    enumTimeForm = new FormGroup({
        keyTime2: new FormControl('', [Validators.required])
    });
    timeQuantityForm = new FormGroup({
        keyTime3: new FormControl('', [Validators.required])
    });

    constructor() {}

    addOrSubtract(): void {
        if (
            !this.addSubSelect.valid ||
            !this.enumForm.valid ||
            !this.quantityForm.valid
        ) {
            alert('Please fill out all boxes');
            return;
        }
        // this is the add or subtract
        const which = this.addSubSelect.value.key1;
        // this is the parts in add
        const part = this.enumForm.value.key2;
        // this is the amount
        const quantity = this.quantityForm.value.key3;
        if (quantity > 100 || quantity < 0) {
                alert('Pick a number less than 100 and greater than 0');
                return;
        }
        if (which === 'add') {
            this.currentDate.mtDate.add(quantity, part);
        }

        if (which === 'sub') {
            this.currentDate.mtDate.subtract(quantity, part);
        }
    }

    addOrSubtractTime(): void {
        if (
            !this.addSubTimeSelect.valid ||
            !this.enumTimeForm.valid ||
            !this.timeQuantityForm.valid
        ) {
            alert('Please fill out all boxes');
            return;
        }
        // this is the add or subtract
        const which = this.addSubTimeSelect.value.keyTime1;
        // this is the parts in add
        const part = this.enumTimeForm.value.keyTime2;
        console.log(part);
        // this is the amount
        const quantity = this.timeQuantityForm.value.keyTime3;
        console.log(quantity);

        if (which === 'add') {
            console.log(quantity, part);
            this.currentTime.mtDate.add(quantity, part);
            console.log(this.currentTime.mtDate);
        }

        if (which === 'sub') {
            this.currentTime.mtDate.subtract(quantity, part);
            console.log(this.currentTime.mtDate);
        }
    }
}
