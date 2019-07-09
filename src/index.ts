import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
})
export class NgxDateModule {
    static forRoot(): any {
        return {
            ngModule: NgxDateModule,
        };
    }
}
