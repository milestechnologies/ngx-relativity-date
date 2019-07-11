import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-test',
    templateUrl: './add-subtract-date.component.html'
})
export class AddSubtractDateComponent {
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
                this.quantityForm.value.key3 = '';
                this.addSubSelect.value.key1 = '';
                this.enumForm.value.key2 = '';
                return;
        }
        if (which === 'add') {
            this.currentDate.mtDate.add(quantity, part);
        }

        if (which === 'sub') {
            this.currentDate.mtDate.subtract(quantity, part);
        }
    }
    setDate(): void {
        this.currentDate = new Date();
    }
}
