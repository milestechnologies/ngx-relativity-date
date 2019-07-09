import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
})
export class NgxPackageStarterModule {
    static forRoot(): any {
        return {
            ngModule: NgxPackageStarterModule,
        };
    }
}
