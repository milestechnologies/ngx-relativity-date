import { NgModule } from '@angular/core';
import { MtDate } from './date.library';

declare global {
    // tslint:disable-next-line: interface-name
    interface Date {
        mtDate: MtDate;
    }
}
Object.defineProperty(Date.prototype, 'mtDate', {
    get: function(): MtDate {
        return new MtDate(this, true);
    },
});

@NgModule({})
export class MtDateModule {
    static forRoot(): any {
        return {
            ngModule: MtDateModule,
        };
    }
}
