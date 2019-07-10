import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MtDate } from './date.library';

declare global {
    // tslint:disable-next-line: interface-name
    interface Date {
        mtDate: MtDate;
    }
}

@NgModule({
    imports: [CommonModule]
})
export class NgxDateModule {
    static forRoot(customWorkWeek?: any): any {
        Object.defineProperty(Date.prototype, 'mtDate', {
            get: function(): MtDate {
                return new MtDate(this, true, customWorkWeek);
            }
        });
        if (customWorkWeek) {
            return {
                ngModule: NgxDateModule,
                providers: [{ provide: 'config', useValue: customWorkWeek }]
            };
        }
        return {
            ngModule: NgxDateModule
        };
    }
}
